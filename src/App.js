import React from 'react';
import './App.css';
import Search from './components/Search';
import MovieView from './components/MovieView';
import Selected from './components/Selected';
import Container from 'react-bootstrap/Container';
import {MovieProvider} from './MovieContext';

function App() {
  return (
    <MovieProvider>
      <div className="App">
        <Container fluid>
          <Search />
          <MovieView />
          <Selected />
        </Container>
      </div>
    </MovieProvider>
  );
}

export default App;
