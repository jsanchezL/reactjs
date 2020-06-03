import React, {Component} from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

// Importando componentes

import MiComponente from './components/MiComponente';

/*function RegresaTexto (props) {
  var r = (
    <div>
      <h2>Soy un componente de texto que esta desde el App con el texto: {props.texto}</h2>
    </div>
  )
  return r;
}*/

class RegresaTexto extends Component {
  state = {
    show: true
  }

  // Evitar el .bind en los eventos de botones
  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  render () {
    if (this.state.show) {
      return (
        <div>
          <h2>
            Soy un componente de texto que esta desde el App con el texto:
            {this.props.texto}
          </h2>
          <button onClick={this.toggleShow}>Actualizar</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>No elementos</h1>
          <button onClick={this.toggleShow}>Actualizar</button>
        </div>
      )
    }
  }
}

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <RegresaTexto texto="Algo mas" />
        <RegresaTexto texto="PQ" />
      </header>
      <section className="componente">
        <MiComponente />
        <MiComponente />
        <MiComponente />
      </section>
    </div>
  )
}

export default App
