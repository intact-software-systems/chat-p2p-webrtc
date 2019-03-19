import React from 'react'
import PropTypes from 'prop-types'

import DataChannel from './DataChannel'

export default class Chatting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataChannel: DataChannel.withName('chatting'),
            message: []
        }
    }

    componentDidMount() {
        this.state.dataChannel.callbacks().onMessage(event => this.onLocalMessageReceived(event))
        this.state.dataChannel.connect()
        this.state.dataChannel.callbacks().onOpenDo(() => this.state.dataChannel.sendMessage('Hello'))
    }

    onLocalMessageReceived(event) {
        console.log(`Remote message received by local: ${event.data}`)

        this.setState({
            message: [...this.state.message, event.data]
        })

        console.log(this.state.message)
    }


    render() {
        return <div>

        </div>
    }
}

Chatting.propTypes = {
    name: PropTypes.string.isRequired
}
