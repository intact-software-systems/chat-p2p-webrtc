import React from 'react'
import PropTypes from 'prop-types'
import CloseGreyImage from '../public/images/close-grey.png'
import PlusImage from '../public/images/Plus_mobile.svg'
import IF from '../util/IF'

export default class Textarea extends React.Component {
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
        return <div className="d-flex flex-row border rounded">

            <img className="p-2"
                 id="add-icon"
                 src={PlusImage}
                 alt="Reset text icon"
                 onClick={event => {
                     event.target.value = ''
                     return this.onChange(event)
                 }}
            />

            <textarea className="p-2 flex-grow-1 border border-primary"
                      id={this.props.id}
                      ref={this.reference}
                      value={this.state.value}
                      placeholder={this.props.placeholder}
                      tabIndex="1"
                      onChange={event => this.onChange(event)}
                      onKeyDown={event => this.onKeyDown(event)}
                      autoComplete="off"
                      readOnly={this.props.readonly}
                      rows={2}
            />

            <img className="p-2"
                 id="reset-icon"
                 src={CloseGreyImage}
                 alt="Reset text icon"
                 onClick={event => {
                     event.target.value = ''
                     return this.onChange(event)
                 }}
            />

            <IF condition={this.props.validityChecker(this.state.value) === false}>
                    <span className="text-danger" id="system-message">
                        {this.props.errorMessage}
                    </span>
            </IF>
        </div>
    }
}

Textarea.propTypes = {
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
    errorMessage: PropTypes.string
}

Textarea.defaultProps = {
    value: '',
    placeholder: '',
    heading: '',
    reference: false,
    resetIcon: false,
    readonly: false,
    errorMessage: 'Feil input',
    validityChecker: value => true,
    onKeyDown: event => true
}
