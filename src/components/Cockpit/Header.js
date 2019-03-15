import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>Forms and Conditional Rendering with React!</h1>
            <p>Click the toggle button to see list of persons!</p>
            <button onClick={props.click}>Toggle Person!</button>
        </div>
    )
}

export default Header