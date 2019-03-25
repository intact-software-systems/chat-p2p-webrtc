import React from 'react'
import PropTypes from 'prop-types'
import ChatOutput from './ChatOutput'
import ChatInput from './ChatInput'

const uuidv4 = require('uuid/v4')

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chats: []
        }
    }

    onMessage(message) {
        if(message.length > 0)
            this.setState({chats: [...this.state.chats, message]})
    }

    render() {
        return <div key={uuidv4()}>
            <h3 className="text-center">{'Chat room:' + this.props.chatRoomId}</h3>
            <ChatOutput chats={this.state.chats} chatRoomId={this.props.chatRoomId}/>
            <ChatInput onMessage={m => this.onMessage(m)} chatRoomId={this.props.chatRoomId}/>
        </div>
    }
}

ChatRoom.propTypes = {
    chatRoomId: PropTypes.string.isRequired
}
