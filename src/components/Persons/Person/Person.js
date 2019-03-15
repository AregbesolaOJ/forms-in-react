import React, { Component } from 'react'
import './Person.css'

class Person extends Component {    
    render () {
        return (
            <div className="Person">
                <p onClick={this.props.click}>I'm {this.props.name}, about {this.props.age} years old,
                <br /> and i'm from {this.props.city}</p>
                <p>{this.props.children}</p>
                <input type="text" 
                    onChange={this.props.change} 
                    value={this.props.name} 
                />
            </div>
    
        )    
    }
}
export default Person