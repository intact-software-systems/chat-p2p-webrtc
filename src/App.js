import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from './AppHeader'
import ChatInput from './components/ChatInput'

export default class App extends React.Component {

    onChange(event) {
        console.log('Event ' + event.target.value)
    }

    onKeyDown(event) {
        if (event.keyCode === 13) {
            console.log('Enter pressed ' + event.key)
        }
        console.log('Event ' + event.keyCode)
    }


    render() {
        return <div style={{flexGrow: 1}}>
            <AppHeader/>
            <ChatInput onKeyDown={e => this.onKeyDown(e)} onChange={e => this.onChange(e)}/>
        </div>
    }
}

App.propTypes = {
    name: PropTypes.string.isRequired
}
