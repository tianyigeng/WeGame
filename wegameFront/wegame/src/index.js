import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './index.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/**
 * Created by dianazhang on 2017/10/20.
 */

// Include your new Components here
import MainPage from '../src/mainPage';
import Recommendation from '../src/recommendation';
import allGame from '../src/allGame';
import UserPage from './userPage';
import allUsers from './allUsers';

class Game extends React.Component {

    render() {
        return (
            <Router  history="">
                <div>
                        <Navbar>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href={'/MainPage'}>We Game</a>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Nav>
                                <NavItem href={'/AllGame'}>All Games</NavItem>
                                <NavItem href={'/Recommendation'}>Recommendations</NavItem>
                                <NavItem href={'/AllUser'}>CheckAllUsers</NavItem>
                            </Nav>
                        </Navbar>

                        <div className = 'game'>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/user/:uname"  component={UserPage}/>
                            <Route path="/Recommendation" component={Recommendation}/>
                            <Route path="/MainPage" component={MainPage}/>
                            <Route path="/AllGame" component={allGame}/>
                            <Route path="/AllUser" component={allUsers}/>
                        </div>


                </div>
            </Router>
    );
    }
}


render(
<Game />,
    document.getElementById('root')
);

/*
 {this.state.showPopup ?
 <Popup
 text='Close Me'
 closePopup={this.togglePopup.bind(this)}
 />
 : null
 }
 */