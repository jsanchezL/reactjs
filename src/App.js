import React, {Component} from 'react'
import './assets/css/App.css';
import tasks from './samples/tareas.json';
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';

class App extends Component{
  state = {
    tasks: tasks
  }

  addTask = (name, description) => {    
    const newTask = {
      id: (this.state.tasks.length + 1) ,
      name : name,
      description : description
    };
    
    this.setState({
      tasks: [...this.state.tasks,newTask] //Agregando el nuevo elemento a las tareas ya existentes
    });
  }

  render() {
    return (
      <div>
        <TaskForm addTask = {this.addTask} /> {/* Pasando una función al componente */}
        <Tasks tasks = {this.state.tasks} />
      </div>
    )
  }
}

export default App
