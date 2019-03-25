import React from "react";
import PropTypes from "prop-types";

/**
 * @return {null}
 */
export default function IF(props) {
    if(!props.condition) {
        return null;
    }
    return <span>{props.children}</span>
}

IF.propTypes = {
    condition: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};