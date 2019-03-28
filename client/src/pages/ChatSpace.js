import React from 'react'
import PropTypes from 'prop-types'
import ChatRoom from '../components/ChatRoom'
import Spinner from 'react-bootstrap/Spinner'
import DataChannelOneWay from '../webrtc/DataChannelOneWay'

const uuidv4 = require('uuid/v4')

export default class ChatSpace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataChannel: DataChannelOneWay.withName(this.props.chatRoomId),
            messages: []
        }
    }

    onMessage(message) {
        if (message.length > 0) {
            this.setState({messages: [...this.state.messages, message]})
            this.state.dataChannel.sendMessage(message)
        }
    }

    componentDidMount() {
        this.state.dataChannel.createOffer()
        this.state.dataChannel.callbacks()
            .onMessageDo(event => this.onLocalMessageReceived(event))
            .onOpenDo(() => {
                this.setState({messages: []})
            })
    }

    onLocalMessageReceived(event) {
        console.log(`Remote message received by local: ${event.data}`)

        this.setState({
            message: [...this.state.message, event.data]
        })

        console.log(this.state.message)
    }

    render() {
        if (!this.state.dataChannel.isConnected()) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }

        return <div key={uuidv4()}>
            <ChatRoom chatRoomId={this.props.chatRoomId} onMessage={message => this.onMessage(message)} chats={this.state.messages}/>
        </div>
    }
}

ChatSpace.propTypes = {
    chatRoomId: PropTypes.string.isRequired
}
