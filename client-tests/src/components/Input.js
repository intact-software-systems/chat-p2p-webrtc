import React from 'react'
import PropTypes from 'prop-types'
import CloseGreyImage from '../public/images/close-grey.png'
import IF from "../util/IF"

export default class Input extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value
        }
        this.reference = this.props.reference ? React.createRef() : undefined
    }

    componentDidMount() {
        if (this.props.reference) {
            this.reference.current.focus()
        }
    }

    onChange(event) {
        this.props.onChange(event)
        this.setState({value: event.target.value})
    }

    onKeyDown(event) {
        this.props.onKeyDown(event)
    }

    isMutable() {
        return this.props.resetIcon && !this.readonly
    }

    render() {
        return <div>
            <label className="input-textfield">
                <IF condition={this.props.heading.length > 0}>
                    <span className="text-normal">
                        {this.props.heading}
                    </span>
                </IF>

                <input id={this.props.id}
                       ref={this.reference}
                       type="text"
                       value={this.state.value}
                       placeholder={this.props.placeholder}
                       tabIndex="1"
                       onChange={event => this.onChange(event)}
                       onKeyDown={event => this.onKeyDown(event)}
                       autoComplete="off"
                       readOnly={this.props.readonly}
                />

                <IF condition={this.isMutable()}>
                    <img id="reset-icon"
                         src={CloseGreyImage}
                         alt="Reset text icon"
                         onClick={event => {
                             event.target.value = ''
                             return this.onChange(event)
                         }}
                    />
                    <span id="reset-icon"/>
                </IF>

                <IF condition={this.props.validityChecker(this.state.value) === false}>
                    <span className="system-message" id="system-message">
                        {this.props.errorMessage}
                    </span>
                </IF>
            </label>
        </div>
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    validityChecker: PropTypes.func,
    value: PropTypes.string,
    heading: PropTypes.string,
    placeholder: PropTypes.string,
    reference: PropTypes.bool,
    resetIcon: PropTypes.bool,
    readonly: PropTypes.bool,
    errorMessage: PropTypes.string,
}

Input.defaultProps = {
    value: '',
    placeholder: '',
    heading: '',
    reference: false,
    resetIcon: false,
    readonly: false,
    errorMessage: 'Feil input',
    validityChecker: value => true,
    onKeyDown: event => true,
}
