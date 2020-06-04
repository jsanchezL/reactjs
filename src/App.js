import React, {Component} from 'react'
import './assets/css/App.css'
import tasks from './samples/tareas.json'
import Tasks from './components/Tasks'
import TaskForm from './components/TaskForm'
import Posts from './components/Posts'

class App extends Component{
  state = {
    tasks: tasks
  }

  addTask = (name, description) => {    
    const newTask = {
      id: (this.state.tasks.length + 1),
      name : name,
      description : description
    }
    
    this.setState({
      tasks: [...this.state.tasks,newTask] //Agregando el nuevo elemento a las tareas ya existentes
    })
  }

  deleteTask = id => {
    const newTasks = this.state.tasks.filter(task => task.id !== id) //Filtando por id
    this.setState({
      tasks: newTasks
    })
  }

  checkDone = id => {
    // Filtrando por estado
    const newTasks = this.state.tasks.map(task => {
      if (task.id === id && task.state !== "Done") {
        task.state = "Done"
      }
      return task;
    })
    this.setState({
      tasks: newTasks 
    })
  }

  render() {
    return (
      <div>
        <TaskForm addTask = {this.addTask} /> {/* Pasando una función al componente */}
        <Tasks tasks={this.state.tasks} deleteTask={this.deleteTask} checkDone={this.checkDone} />
        <Posts />
      </div>
    )
  }
}

export default App
