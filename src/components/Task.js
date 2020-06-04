import React, { Component } from 'react';

/**
 * Para renderear un componente para una sola tarea
 */
class Task extends Component{
    
    render() {
        const {tarea} = this.props;
        return (
            <div>           
                {tarea.name} - {tarea.description} - {tarea.state} 
                <input type="checkbox"/>
                <button>X</button>
            </div>        
        )    
    }
}

export default Task