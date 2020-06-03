import React, { Component } from 'react';

/**
 * Para renderear un componente para una sola tarea
 */
class Task extends Component{
    render() {
        return (
            <div>           
                {this.props.tarea.name} - {this.props.tarea.description} - {this.props.tarea.state} 
                <input type="checkbox"/>
                <button>X</button>
            </div>        
        )    
    }
}

export default Task