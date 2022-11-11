import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../images/layout/logo.svg';
import {NavLink,Link} from 'react-router-dom';

import './header.css';

function Header(props) {

    // console.log(props)

    return (
        <Navbar className="header__navbar" collapseOnSelect  bg="none" variant="light" expand="sm">
        <Container>
            <Link to='home'>
            <Navbar.Brand>
                <img
                alt="logo"
                src={logo}
                width="50"
                height="50"
                className="d-inline-block center"
                />{' '}
            </Navbar.Brand></Link>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><NavLink to="home">Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to="gallery">Gallery</NavLink></Nav.Link>
                    <Nav.Link onClick={props.formAppear}>Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header