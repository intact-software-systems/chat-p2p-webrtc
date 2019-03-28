import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './public/stylesheets/bootstrap.min.css'
import AppConstants from './util/AppConstants'

ReactDOM.render(<App name={'chat'} clientBaseUrl={AppConstants.clientBaseUrl()}/>, document.getElementById(AppConstants.reactComponentId()))
