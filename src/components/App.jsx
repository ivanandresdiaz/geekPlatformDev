import React, { useState, useEffect } from 'react';
import imagen from '../imagen.jpg';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const getData = async () => {
    const url = 'https://rickandmortyapi.com/api/character/';
    const response = await fetch(url);
    const data = await response.json();
    setCharacters(data.results);
  };
  useEffect(() => {
    getData();
  }, [characters]);
  const CopyPlugin = 'new CopyPlugin({from:path.resolve(__dirname,"src", "assets/images"),to:"assets/images"})';
  return (
    <div>
      <h1>
        Bienvenido a React
      </h1>
      <p>Para copia de archivos, me imagino video</p>
      <p> copy-webpack-plugin -D</p>
      <p>{CopyPlugin}</p>
      <div className='Link'>
        <a href='http://google-webfonts-helper.herokuapp.com/fonts/ubuntu?subsets=cyrillic,latin'>Descargar Fuentes</a>
      </div>
      <figure>
        <img src={imagen} alt='Andres' />
      </figure>
      {characters.map((character) => {
        return (
          <p key={character.id}>{character.name}</p>
        );
      })}
    </div>
  );
};

export default App;
