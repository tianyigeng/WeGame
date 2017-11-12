import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './index.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/**
 * Created by dianazhang on 2017/10/20.
 */





class MainPage extends React.Component {
    render() {
        return (
            <div className="MainPage">
                <h1>We Game !</h1>
                <p>Login or create an account for free</p>


            </div>
        );
    }
}
export default MainPage