import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import {BrowserRouter} from 'react-router-dom'
import AppPages from './AppPages'

const mockData = require('./mock/app-data-mock.json')

export default class App extends React.Component {
    onClicked(key, event) {
        console.log(key + ' ' + event.target.value)
    }

    render() {
        return <BrowserRouter basename={this.props.clientBaseUrl}>
            <AppHeader onClicked={(key, event) => this.onClicked(key, event)} text={mockData.menu}/>
            <AppPages clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
            <AppFooter/>
        </BrowserRouter>
    }
}

App.propTypes = {
    name: PropTypes.string.isRequired,
    clientBaseUrl: PropTypes.string.isRequired
}
