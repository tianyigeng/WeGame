import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './index.css';
/**
 * Created by dianazhang on 2017/10/20.
 */



class User extends React.Component {
    render() {
        return (
            <div className="User">

                <h1>User Name</h1>
                <p>User Information Here.</p>
            </div>
        );
    }
}
export default User