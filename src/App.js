import React, {Component} from 'react'
import './assets/css/App.css';
import tareas from './samples/tareas.json';
import Tasks from './components/Tasks';

class App extends Component{
  state = {
    tareas: tareas
  }

  render() {
    return (
      <div>
        <Tasks tareas = {this.state.tareas} />
      </div>
    )
  }
}

export default App
