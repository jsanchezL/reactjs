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
                <input type="checkbox"/>
                <button>X</button>
            </div>        
        )    
    }
}

Task.propTypes = {
    task : PropTypes.object.isRequired
}

export default Task