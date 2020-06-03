import React from 'react';
import logo from './logo.svg';
import './App.css';

function regresaTexto (texto) {
  var r = (
    <div>
      <h2>Soy un componente de texto y el texto es: {texto}</h2>
    </div>
  )
  return r;
}

function App() {
  var texto = "Pasando el texto a un componente"
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {regresaTexto(texto)}
      </header>
    </div>
  );
}

export default App;
