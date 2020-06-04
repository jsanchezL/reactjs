import React, {Component} from 'react';
import Task from './Task';

/**
 * Listar las tareas
 */
class Tasks extends Component {
    render(){
        return this.props.tareas.map(e => <Task tarea={e} key={e.id}/>)
    }
}

export default Tasks