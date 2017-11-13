import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './mainPage.css';
import axios from 'axios';
import {Button} from "semantic-ui-react";
import { Divider, Form, Label } from 'semantic-ui-react'
/**
 * Created by dianazhang on 2017/10/20.
 */





class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name:'', password:'',result :''};


        this.signup = this.signup.bind(this);
        this.handleName = this.handleName.bind(this);

    }

    handleName(event){
        this.setState({name: event.target.value});
    }

    signup(event) {

        let url = "http://0.0.0.0:8000/addUser/"+this.state.name;
        axios.get(url)
            .then((response) => {
                console.log("success");
                this.setState({result:JSON.stringify(response.data)})
            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });

    }


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
                                <button className="btn btn-info" >Sign Up</button>
                            </form>


                        </div>
                        <div class="col-lg-6">
                            <form class="form-signin">
                                <h3>Sign up</h3>
                                <br/>
                                <input value={this.state.name}  id="signName" type="text" class="form-control" placeholder="Name" onChange={this.handleName}  required />
                                <br/>
                                <input id="signPassword" class="form-control" placeholder="Password" required/>
                                <br/>
                                <Link to={{ pathname: "/user/"+this.state.name, param1:this.state.name}}><button className="btn btn-info" onClick={this.signup}>Sign Up</button></Link>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
export default MainPage

/*
 axios.get("http://0.0.0.0:8000/addUser/"+this.state.name)
 .then((response) => {
 console.log("success");
 this.setState({result:JSON.stringify(response.data)})
 })
 .catch((error) => {
 alert(error);
 console.log("error");
 });
 */