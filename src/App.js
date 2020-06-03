import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

// Importando componentes

import MiComponente from './components/MiComponente';

function RegresaTexto (props) {
  var r = (
    <div>
      <h2>Soy un componente de texto que esta desde el App con el texto: {props.texto}</h2>
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
        {RegresaTexto(texto)} 
        <RegresaTexto texto="Algo mas"/>      
      </header>
      <section className="componente">
        <MiComponente />
        <MiComponente />
        <MiComponente />
      </section>
    </div>    
  );
}

export default App;
