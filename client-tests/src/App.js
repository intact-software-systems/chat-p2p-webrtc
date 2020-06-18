import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import {BrowserRouter} from 'react-router-dom'
import AppPages from './AppPages'
import AppPagesSocketIO from './AppPagesSocketIO'
import AppPagesGraphQL from './AppPagesGraphQL'

const AppType = require('./library/AppType').AppType
const mockData = require('./mock/app-data-mock.json')

export default class App extends React.Component {
    onClicked(key, event) {
        console.log(key + ' ' + event.target.value)
    }

    renderAppPages() {
        switch(this.props.appType) {
            case AppType.GRAPHQL:
                return <AppPagesGraphQL clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
            case AppType.SOCKETIO:
                return <AppPagesSocketIO clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
            default:
                return <AppPages clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
        }
    }

    render() {
        const appPages = this.renderAppPages()

        return <BrowserRouter basename={this.props.clientBaseUrl}>
            <AppHeader onClicked={(key, event) => this.onClicked(key, event)} text={mockData.menu}/>
            {appPages}
            <AppFooter/>
        </BrowserRouter>
    }
}

App.propTypes = {
    name: PropTypes.string.isRequired,
    clientBaseUrl: PropTypes.string.isRequired,
    appType: PropTypes.string.isRequired
}
