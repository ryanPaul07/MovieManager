import React, {useContext} from 'react';
import Card from 'react-bootstrap/Card';
import {MovieContext} from '../MovieContext';

function Selected() {
  const { nominationsValue, deletedMoviesValue } = useContext(MovieContext);
  const [nominations, setNominations] = nominationsValue;
  const [deletedMovieID, setDeletedMovieID] = deletedMoviesValue;

  const handleDelete = (deleted) => (event) => {
    event.preventDefault();

    setDeletedMovieID(deleted.movieId);   // Keep track of the deleted movie
    setNominations(prevNominations => [...prevNominations.filter(selected => selected.movieId !== deleted.movieId)]); //delete the selected movie from nominations array
  }

  return (
    <Card className="SelectedCardView">
      <Card.Body>
        <Card.Title><center>Selected Movies</center></Card.Title>
        {nominations.map(nominated => (
          <div key={nominated.movieId} style={{ display:"flex", justifyContent:"space-between"}}>
            <p style={{ margin: "0", padding: "0"}}>{nominated.title} ({nominated.year})</p>
            <button type="button" className="close" aria-label="Close" onClick={handleDelete(nominated)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

export default Selected;