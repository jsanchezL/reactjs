import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Para renderear un componente para una sola tarea
 */
class Task extends Component{

    setCompleteTask(task) {
        return {
            color: (task.state === "Done") ? 'gray' : 'black',
            textDecoration: (task.state === "Done") ? 'line-through' : 'none'
        }
    }
    
    render() {
        const {task} = this.props;
        return (
            <div style={this.setCompleteTask(task)}>           
                {task.name} - {task.description} - {task.state} 
                <input type="checkbox" onChange={this.props.checkDone.bind(this, task.id)} checked={(task.state === "Done") ? true: false} />
                <button onClick={this.props.deleteTask.bind(this, task.id)}>X</button> {/* Pasando parametros a la función */}
            </div>        
        )    
    }
}

Task.propTypes = {
    task : PropTypes.object.isRequired
}

export default Task