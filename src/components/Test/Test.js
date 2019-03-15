import React from 'react';
import './Test.css'

const Test = (props) => {
    return (
        <div className="Test">
            <h1>{props.status}</h1>
            <button onClick={props.clicked}>{props.button}</button>
        </div>
      )
  
}


export default Test