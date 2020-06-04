import React, { Component } from 'react'

export default class Posts extends Component {
    
    state = {
        posts: []
    }

    async componentDidMount(){
        const res = await fetch('https://jsonplaceholder.typicode.com/comments')
        const data = await res.json()
        this.setState({posts:data})
        console.log(data)
    }

    render() {
        return (
            <div>
                <h1>Comentarios</h1>
                {
                    this.state.posts.map(post => {
                        return <div key={post.id}>
                            <h2>{post.name}</h2>
                            <p>{post.body}</p>
                        </div>
                    })
                }
            </div>
        )
    }
}
