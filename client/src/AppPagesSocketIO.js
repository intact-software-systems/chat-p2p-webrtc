import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route, Switch} from 'react-router-dom'
import ChatSpace from './pages/ChatSpace'
import io from 'socket.io-client'

const AppTopics = require('./library/AppTopics').AppTopics

export default class AppPagesSocketIO extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chatRoomId: undefined,
            chatRoom: undefined,
            socket: io()
        }
    }

    componentDidMount() {
        this.state.socket.on(
            AppTopics.ROOM.name,
            room => {
                console.log('Room ' + JSON.stringify(room))
            })

        this.state.socket.on(
            AppTopics.CHAT_MESSAGE,
            chat => {
                console.log('Chat ' + JSON.stringify(chat))
            }
        )

        this.state.socket.emit(AppTopics.ROOM.name, "Default")
    }

    render() {
        // TODO: Join room page/route

        return <Switch>
            <Route exact path={'/'} render={routerProps => <ChatSpace chatRoomId={this.props.chatRoomId}/>}/>
            <Redirect to={'/'}/>
        </Switch>
    }
}

AppPagesSocketIO.propTypes = {
    clientBaseUrl: PropTypes.string.isRequired,
    chatRoomId: PropTypes.string,
    chatRoom: PropTypes.object
}

AppPagesSocketIO.defaultProps = {
    chatRoomId: 'default'
}

