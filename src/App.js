import React, {Component} from 'react'
import './assets/css/App.css';
import tareas from './samples/tareas.json';

class App extends Component{
  state = {
    tareas: tareas
  }

  render() {
    return (
    <div>
      { this.state.tareas.map(e => <p key={e.id}>{e.name} - {e.description} - {e.state} </p>)}
    </div>
    )
  }
}

export default App
