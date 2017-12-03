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
import UserPage from '../src/users/userPage';
import allUsers from './allUsers';
import userAllGame from '../src/users/userAllGame'
import userRecommendation from '../src/users/userRecommendation'
import UserFriend from '../src/users/userPageFriend'


class Game extends React.Component {

    render() {
        return (
            <Router  history="">
                <div>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/Recommendation" component={MainPage}/>
                            <Route path="/MainPage" component={MainPage}/>
                            <Route path="/AllGame" component={allGame}/>
                            <Route path="/AllUser" component={allUsers}/>


                    <Route path="/user/:uname/Mainpage"  component={UserPage}/>
                    <Route path="/user/:uname/AllGame"  component={userAllGame}/>
                    <Route path="/user/:uname/Recommendation"  component={userRecommendation}/>
                    <Route path="/user/:uname/Friend/:ufriend"  component={UserFriend}/>

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