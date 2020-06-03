import React, {Component} from 'react';

class MiComponente extends Component {
  render () {
    let producto = {
      name: 'Pizza',
      caracteristicas: ['120gr', '60Kcal', '50MXN']
    }

    return (
      <React.Fragment>
        <h1>{'Nombre: ' + producto.name}</h1>
        <h2>Caracteristicas</h2>
        <ol>
          {producto.caracteristicas.map ((car, i) => {
            return <li key={i}>{car}</li>
          })}
        </ol>
        <hr />
      </React.Fragment>
    )
  }
}

export default MiComponente
