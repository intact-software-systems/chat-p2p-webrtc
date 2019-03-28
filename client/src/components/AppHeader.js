import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function AppHeader(props) {
    const {text, onClicked} = props
    const menu = text

    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand onClick={e => onClicked(menu.home, e)}>{menu.home}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link onClick={e => onClicked(menu.features, e)}>{menu.features}</Nav.Link>
                <Nav.Link onClick={e => onClicked(menu.pricing, e)}>{menu.pricing}</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link onClick={e => onClicked(menu.login, e)}>{menu.login}</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}

AppHeader.propTypes = {
    text: PropTypes.object.isRequired,
    onClicked: PropTypes.func.isRequired
}
