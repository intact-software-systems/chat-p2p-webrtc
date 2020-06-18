import {Component} from 'react';
import Handlebars from 'handlebars/dist/handlebars';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

export default class HandlebarsToReact extends Component {

    static propTypes = {
        model: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        template: PropTypes.string.isRequired
    };

    static defaultProps = {
        model: {}
    };

    render() {
        const {template, model} = this.props;

        if (!template) {
            return false;
        }

        const compiledTemplate = Handlebars.compile(template);
        return ReactHtmlParser(compiledTemplate(model));
    }
}