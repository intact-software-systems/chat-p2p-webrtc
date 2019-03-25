import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route, Switch} from 'react-router-dom'
import ChatSpace from './pages/ChatSpace'

export default class AppPages extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chatRoomId: undefined,
            chatRoom: undefined
        }
    }

    render() {
        return <Switch>
            <Route exact path={'/'} render={routerProps => <ChatSpace chatRoomId={this.props.chatRoomId}/>}/>
            <Redirect to={'/'}/>
        </Switch>
    }
}

AppPages.propTypes = {
    clientBaseUrl: PropTypes.string.isRequired,
    chatRoomId: PropTypes.string,
    chatRoom: PropTypes.object
}

AppPages.defaultProps = {
    chatRoomId: 'default'
}

