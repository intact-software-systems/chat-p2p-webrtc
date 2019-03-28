import React from 'react'
import PropTypes from 'prop-types'
import ChatOutput from './ChatOutput'
import ChatInput from './ChatInput'

export default class ChatRoom extends React.Component {
    render() {
        return <div>
            <h3 className="text-center">{'Chat room:' + this.props.chatRoomId}</h3>
            <ChatOutput chats={this.props.chats} chatRoomId={this.props.chatRoomId}/>
            <ChatInput onMessage={m => this.props.onMessage(m)} chatRoomId={this.props.chatRoomId}/>
        </div>
    }
}

ChatRoom.propTypes = {
    chatRoomId: PropTypes.string.isRequired,
    onMessage: PropTypes.func.isRequired,
    chats: PropTypes.array.isRequired
}
