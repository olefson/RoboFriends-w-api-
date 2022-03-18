import React, { Component } from 'react';
import CardList from '../Components/CardList';
import { robots } from '../robots';
import SearchBox from '../Components/SearchBox';
import './App.css'
import Scroll from '../Components/Scroll'
import ErrorBoundry from '../Components/ErrorBoundry';



class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    onSearchChange = (event) => {//when making custom methods....use this syntax when creating your own 
        this.setState({searchfield: event.target.value})
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())//what does .then do?
        .then(users => this.setState({ robots: users}));
    }

    render() {
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        return !robots.length ?//ternary operators
        <h1>Loading</h1> :
        (
            <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
            <ErrorBoundry>
            <CardList robots={filteredRobots}/>
            </ErrorBoundry>
            </Scroll>
            </div>
        );
    }
}


export default App;