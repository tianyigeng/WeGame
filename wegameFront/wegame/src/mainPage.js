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
        this.handlePassword = this.handlePassword.bind(this);

    }

    handleName(event){
        this.setState({name: event.target.value});
    }

    handlePassword(event){
        this.setState({password: event.target.value});
    }

    signup(event) {
        axios({
                url: 'http://0.0.0.0:8000/addUser/',
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:{idname:this.state.name, password:this.state.password},
            }
        )
            .then((response) => {
                console.log("success");
            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });



    }


    render() {
        return (
            <div className="MainPage">
                <h1>We Game !</h1>
                <p>Login or create an account for free</p>

                <div className="inputDiv">

                    <div className="row marketing">
                        <div className="LogOrSign">
                            <form class="form-signin">
                                <h3>LogIn Or SignUp</h3>
                                <br/>
                                <input id="inputName" class="form-control" placeholder="UserId" required onChange={this.handleName}/>
                                <br/>
                                <input id="inputPassword" class="form-control" placeholder="Password" required onChange={this.handlePassword}/>
                                <br/>
                                <Link to={{ pathname: "/user/"+this.state.name}}><button className="btn btn-info" >Log In</button></Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-info" onClick={this.signup}>Sign Up</button>
                            </form>
                            <br/>

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