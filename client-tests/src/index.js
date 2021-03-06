import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './public/stylesheets/bootstrap.min.css'
import AppConstants from './util/AppConstants'

const AppType = require('./library/AppType').AppType

ReactDOM.render(
    <App name={'chat'} clientBaseUrl={AppConstants.clientBaseUrl()} appType={AppType.SOCKETIO}/>,
    document.getElementById(AppConstants.reactComponentId())
)
