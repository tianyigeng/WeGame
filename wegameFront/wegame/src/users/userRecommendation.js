import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import '../index.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from '../menuBar';

class userRecommendation extends React.Component {
    render() {
        return (
            <div className="Recommendation">
                <MenuBar wegame={"/user/"+this.props.match.params.uname+"/Mainpage"} allgame={"/user/"+this.props.match.params.uname+"/AllGame"} recom={"/user/"+this.props.match.params.uname+"/Recommendation"}  logout={true}/>

                <h1>Recommended Games</h1>
                <p>Our recommendations are based on your game history.</p>
            </div>
        );
    }
}
export default userRecommendation