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


import MenuBar from './menuBar';

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>

                    <h3>Sign Up Successfully, Welcome {this.props.name}!</h3>
                    <Link to={"/user/"+this.props.name+"/Mainpage"} ><button type="button" className="btn btn-info" >My Page</button></Link>
                </div>
            </div>
        );
    }
}



class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name:'', password:'',showPopup :false};


        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }

    handleName(event){
        this.setState({name: event.target.value});
    }

    handlePassword(event){
        this.setState({password: event.target.value});

    }

    login(event){
        if (this.state.name !== null && this.state.password !==null){

            window.location = "/user/"+this.state.name+"/Mainpage";
        }
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
                this.setState({showPopup:true});
            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });



    }


    render() {
        return (
            <div className="MainPage">

                <MenuBar wegame="/MainPage" allgame="/AllGame" recom="/Recommendation" logout={false}/>

                <h1>We Game !</h1>
                <p>Login or create an account for free</p>

                <div className="inputDiv">

                    <div className="row marketing">
                        <div className="LogOrSign">
                            <form class="form-signin">
                                <h3>Log In Or Sign Up</h3>
                                <br/>
                                <input id="inputName" class="form-control" placeholder="UserId" required onChange={this.handleName}/>
                                <br/>
                                <input id="inputPassword" class="form-control" placeholder="Password" required onChange={this.handlePassword}/>
                                <br/>

                                <button type="button" className="btn btn-info" onClick={this.login}>Log In</button>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" className="btn btn-info" onClick={this.signup}>Sign Up</button>
                            </form>
                            <br/>

                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup name = {this.state.name}/>
                        : null
                    }
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