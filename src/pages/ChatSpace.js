import React from 'react'
import PropTypes from 'prop-types'
import ChatRoom from '../components/ChatRoom'

export default class ChatSpace extends React.Component {
    render() {
        return <ChatRoom chatRoomId={this.props.chatRoomId}/>
    }
}

ChatSpace.propTypes = {
    chatRoomId: PropTypes.string.isRequired
}
