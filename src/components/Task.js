import React, { Component } from 'react';

/**
 * Para renderear un componente para una sola tarea
 */
class Task extends Component{

    setCompleteTask(tarea) {
        return {
            color: (tarea.state === "Done") ? 'gray' : 'black',
            textDecoration: (tarea.state === "Done") ? 'line-through' : 'none'
        }
    }
    
    render() {
        const {tarea} = this.props;
        return (
            <div style={this.setCompleteTask(tarea)}>           
                {tarea.name} - {tarea.description} - {tarea.state} 
                <input type="checkbox"/>
                <button>X</button>
            </div>        
        )    
    }
}

export default Task