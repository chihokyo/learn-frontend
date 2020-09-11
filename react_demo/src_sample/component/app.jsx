import React, {Component} from 'react'

import logo from '../logo.svg'

class App extends Component {
    render () {
        return (

            <div>
                <img className='logo' src={logo} alt="logo" />
                <p className="logo-p"> Hello React!!</p>
            </div>
        ) 
    }
}

export default App