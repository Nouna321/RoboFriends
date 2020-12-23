import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardList from '../Components/CardList'
import SearchBox from '../Components/SearchBox'
import { render } from '@testing-library/react'
import Scroll from '../Components/Scroll'
import './App.css'
import { setSearchField } from '../Action'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            // searchfield: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => this.setState({ robots: users }))
    }
    //  onSearchChange = (event) => {
    //      this.setState({ searchfield: event.target.value })
    //  }

    render() {
        const { robots } = this.state
        const { searchField, onSearchChange } = this.props
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ? (
            <h1>Loading</h1>
        ) : (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
