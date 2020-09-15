import React, {useContext, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CardDeck } from 'react-bootstrap';
import { MovieContext } from '../MovieContext';
import image from '../no-image.jpg';


function MovieView() {

  const { moviesValue, nominationsValue, deletedMoviesValue } = useContext(MovieContext);
  const [deletedMovieID, setDeletedMovieID] = deletedMoviesValue;
  const [nominations, setNominations] = nominationsValue;
  const [movies, setMovies] = moviesValue;

  useEffect(() => {
    /* 
      Whenever state is refreshed check if a moive has been deleted from the nominations list
      and if so, then set the selected tag in the movies array to false so that the movie can be 
      selected again
    */
    if(movies.length !== 0 && deletedMovieID !== '') {
      setMovies(movies.map(movie => {
        if(movie.movieId === deletedMovieID) {
          return {...movie, selected: false};
        }
        else {
          return movie;
        }
      }));
      setDeletedMovieID('');    // clear deletedmovie hook 
    }
    
  }, [movies, setMovies ,nominations, deletedMovieID, setDeletedMovieID])

  const handleAdd = (movie) => (event) => {
    event.preventDefault();

    movie.selected = true;  // set movie selected to true

    // Create and set the nominations object
    setNominations(prevNomination => [...prevNomination,{
      title: movie.title,
      year: movie.year,
      movieId: movie.movieId,
      selected: true
    }]);
  }

  return (
    <div className="CardsView">
      <CardDeck className="CardDeck">
        {movies.map((movie) => (
          <Card key={movie.movieId}>
            <Card.Img variant="top" src={movie.poster === 'N/A' ? image : movie.poster}/>
            <Card.Body>
              <Card.Title>{movie.title} ({movie.year})</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" disabled={movie.selected} onClick={handleAdd(movie)} style={{width: "100%"}} >Add</Button>
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}

export default MovieView;