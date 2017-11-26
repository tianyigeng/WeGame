import React, { Component } from 'react'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import FaSignOut from 'react-icons/lib/fa/sign-out'

class MenuBar extends Component {


    render() {

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={this.props.wegame}>We Game</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem href={this.props.allgame}>All Games</NavItem>
                    <NavItem href={this.props.recom}>Recommendations</NavItem>
                    <NavItem href={'/AllUser'}>CheckAllUsers</NavItem>
                </Nav>


                {this.props.logout ?
                    <Nav pullRight>
                        <NavItem href={'/MainPage'}><FaSignOut/> Log out</NavItem>
                    </Nav>
                    : null
                }

            </Navbar>
        )
    }
}

export default MenuBar