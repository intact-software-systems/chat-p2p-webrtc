import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import {BrowserRouter} from 'react-router-dom'
import AppPages from './AppPages'
import {AppType} from './AppType'
import AppPagesSocketIO from './AppPagesSocketIO'
import AppPagesGraphQL from './AppPagesGraphQL'

const TestModuleExports = require('./util/TestModuleExports').TestExport

const mockData = require('./mock/app-data-mock.json')

export default class App extends React.Component {
    onClicked(key, event) {
        console.log(key + ' ' + event.target.value)
    }

    renderAppPages() {
        switch(this.props.appType) {
            case AppType.GRAPHQL:
                return <AppPagesSocketIO clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
            case AppType.SOCKETIO:
                return <AppPagesGraphQL clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
            default:
                return <AppPages clientBaseUrl={this.props.clientBaseUrl} chatRoom={mockData.chatRoom}/>
        }
    }

    render() {
        console.log("prop " + TestModuleExports('a'))

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
