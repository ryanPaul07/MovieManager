import React, {useState, createContext} from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {

  const [movies, setMovies] = useState([]);                   // hook to store movies retrieved from OmdbAPI
  const [nominations, setNominations] = useState([]);         // hook to store movies selected (nominated)
  const [deletedMovieID, setDeletedMovieID] = useState('');   // hook to keep track of recently deleted (nomination)

  return (
    <MovieContext.Provider value={{moviesValue: [movies, setMovies], nominationsValue: [nominations, setNominations],deletedMoviesValue: [deletedMovieID, setDeletedMovieID]}}>
      {props.children}
    </MovieContext.Provider>
  );
}