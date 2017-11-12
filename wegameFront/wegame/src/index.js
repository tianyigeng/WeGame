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
import User from '../src/USER';
import SignUp from'../src/signup'


/*
class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>Login to WeGame</h1>
                    <p className="inTitle">UserName:</p> <input type="text" placeholder="User name"/><br/><br/><br/>
                    <p className="inTitle">Password:</p> <input type="text" placeholder="Password"/><br/><br/><br/>


                    <button onClick={this.props.closePopup}>Submit</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.props.closePopup}><a href={'/SignUp'}>Sign In</a></button>


                </div>
            </div>
        );
    }
}
*/

class Game extends React.Component {
    /*
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
*/
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

                            </Nav>
                        </Navbar>

                        <div className = 'game'>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/Recommendation" component={Recommendation}/>
                            <Route path="/MainPage" component={MainPage}/>
                            <Route path="/AllGame" component={allGame}/>

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