import React, { Component } from 'react'

export default class TaskForm extends Component { //Omitir el export al final del componente
    state = {
        name : '',
        description : ''
    }

    // Omitir metodo bind
    onSubmit = e => {
        console.log(this.state);
        e.preventDefault(); //Prevenir que la pagina se refresque cada que da click al guardar
    }

    onChange = e => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                {/* Menejamos el estado del componente y agregamos propiedad name para utilizarla en onChange generico */}
                <input type="text" name="name" placeholder="Titulo de la tarea" onChange={this.onChange} value={this.state.name} />
                <br/>
                <br/>
                <textarea name="description" placeholder="Detalles de la tarea" onChange={this.onChange} value={this.state.description} />
                <button type="submit">
                    Guardar
                </button>
            </form>
        )
    }
}