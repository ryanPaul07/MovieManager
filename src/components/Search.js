import React, {useRef, useState, useContext} from 'react';
import {Col, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Description from './Description';
import { MovieContext } from '../MovieContext';

function Search() {

  const { moviesValue, nominationsValue } = useContext(MovieContext);
  const [movies, setMovies] = moviesValue;
  const [nominations, setNominations] = nominationsValue;
  const movieName = useRef();
  const [errorCode, setErrorCode] = useState(null);
  const handleErrorCode = (value) => setErrorCode(value);
  


  const handleMovie = async (event) => {
    event.preventDefault();
  
    const {movieTitle} = event.target.elements;

    // Before each new search, clear out the error code and the movies hook
    handleErrorCode(null);
    setMovies([]);

    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&s=${movieTitle.value}&type=movie&page=1`);
    const responseJson = await response.json();
    
    handleResponse(responseJson);
  }

  const handleResponse = (res) => {
    var isSelected = false;

    // Check if a response is true
    if(res.Response === "True") {
      res.Search.forEach(movie => {
        if(nominations.length !== 0) {  // loop through the searched movies and compare them to the existing nominated movies
          for(var i = 0; i < nominations.length; i++) {
            if(movie.imdbID === nominations[i].movieId) {
              isSelected = true;        // true if movie exists in nominated list
            } else {
              isSelected = false;       // false if movie dosn't exist in nominated list
            }
          }
        }
        
        // store movies in hook
        setMovies(prevMovies => [...prevMovies, {
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          movieId: movie.imdbID,
          selected: isSelected
        }]);
      });
      
    } else {
      if(res.Error === "Movie not found!") {
        handleErrorCode("Movie not found =(. Try to remember exactly what you were looking for!");
      } else if(res.Error === "Incorrect IMDb ID.") {
        setErrorCode("Incorrect IMDb ID =/. Make sure you are not putting multiple spaces between the words.");
      } else {
        //"Too many results."
        handleErrorCode("Too many results :O. Try to be more specific!");
      }
    }
  }

  const handleReset = (event) => {
    event.preventDefault();

    movieName.current.value = "";
    handleErrorCode(null);
  }

  return(
    <div className="Seach">
      <Form onSubmit={handleMovie}>
        <Form.Row>
          <Col xs={6} className="my-2">
            <Form.Group>
              <Form.Control ref={movieName} placeholder="Movie Title" type="text" name="movieTitle" />
            </Form.Group>
          </Col>
          <Col xs="auto" className="my-2">
          <Button type="submit">Seach</Button>
          </Col>
          <Col xs="auto" className="my-2">
            <Button variant="secondary" onClick={handleReset}>Reset</Button>
          </Col>
        </Form.Row>
      </Form>
      <Description description={errorCode}/>
    </div>
  );
}

export default Search;