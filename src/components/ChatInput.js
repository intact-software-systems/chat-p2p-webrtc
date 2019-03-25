import React from 'react'
import PropTypes from 'prop-types'
import Textarea from './Textarea'

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: undefined
        }
    }

    onChange(event) {
        if (event.target.value !== '\n') {
            console.log('On change ' + event.target.value)
            this.setState({
                message: event.target.value
            })
        }
    }

    onKeyDown(event) {
        if (event.keyCode === 13 && this.state.message) {
            event.preventDefault()
            console.log('Message length ' + this.state.message.length)

            if (this.state.message.length > 0) {
                this.props.onMessage(this.state.message)
            }
            this.setState({message: undefined})
        }

        console.log('Event value ' + event.key)
    }

    render() {
        console.log('Message `' + this.state.message + '`')
        return <div>
            <h6>Write your message:</h6>
            <Textarea
                heading={'Chat input'}
                onChange={event => this.onChange(event)}
                onKeyDown={event => this.onKeyDown(event)}
                id={this.props.chatRoomId}
                reference={true}

            />
        </div>
    }
}

ChatInput.propTypes = {
    onMessage: PropTypes.func.isRequired,
    chatRoomId: PropTypes.string.isRequired
}
