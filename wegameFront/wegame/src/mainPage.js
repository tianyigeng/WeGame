import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './mainPage.css';
import {Button} from "semantic-ui-react";
import { Divider, Form, Label } from 'semantic-ui-react'
/**
 * Created by dianazhang on 2017/10/20.
 */





class MainPage extends React.Component {
    render() {
        return (
            <div className="MainPage">
                <h1>We Game !</h1>
                <p>Login or create an account for free</p>

                <div className="inputDiv">

                    <div class="row marketing">
                        <div class="col-lg-6 logsign">
                            <form class="form-signin">
                                <h3>Log in</h3>
                                <br/>
                                <input id="inputName" class="form-control" placeholder="UserId" required />
                                    <br/>
                                    <input id="inputPassword" class="form-control" placeholder="Password" required/>
                                        <br/>
                                <button class="btn btn-info" type="submit">Log In</button>
                            </form>


                        </div>
                        <div class="col-lg-6">
                            <form action="addUser/" method="post" class="form-signin">
                                <h3>Sign up</h3>
                                <br/>
                                    <input name="u'name'" id="signName" type="text" class="form-control" placeholder="Name" required />
                                        <br/>
                                        <input name="u'password'" id="signPassword" class="form-control" placeholder="Password" required/>
                                            <br/>
                                <button class="btn btn-info" type="submit" >Sign Up</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default MainPage