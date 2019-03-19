import React from 'react'
import PropTypes from 'prop-types'

export default class ChatInput extends React.Component {
    render() {
        return <div>
            input here
        </div>
    }
}


ChatInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
}
