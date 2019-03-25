import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'

const uuidv4 = require('uuid/v4')

export default function ChatOutput(props) {
    return <Card key={props.chatRoomId}>
        {
            props.chats.map(chat => <Card.Body key={uuidv4()}>{chat}</Card.Body>)
        }
    </Card>
}

ChatOutput.propTypes = {
    chats: PropTypes.array.isRequired,
    chatRoomId: PropTypes.string.isRequired
}


