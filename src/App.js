import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from './router';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Link to='/'><button style={{ margin: '40px 0 100px 0' }}>Home</button></Link>
                {router}
            </div>
        );
    }
}

export default App;