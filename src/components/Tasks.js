import React, {Component} from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

/**
 * Listar las tareas
 */
class Tasks extends Component {
    render(){        
        return this.props.tasks.map(t => <Task task={t} key={t.id} deleteTask={this.props.deleteTask} checkDone={this.props.checkDone} />) /* Pasamos la función por props */
    }
}

Tasks.propTypes = {
    tasks : PropTypes.array.isRequired
}

export default Tasks