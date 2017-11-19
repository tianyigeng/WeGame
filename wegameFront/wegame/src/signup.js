import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './index.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/**
 * Created by dianazhang on 2017/10/20.
 */




class SignUp extends React.Component {
    render() {
        return (
            <div className='SignUp'>

                <h1>Sign Up WeGame</h1>
                <p className="inTitle">UserName: <input type="text" placeholder="User name"/></p>
                <p className="inTitle">Password: <input type="text" placeholder="Password"/></p>
                <button onClick={this.props.closePopup}>Submit</button>

            </div>
        );
    }
}
export default SignUp