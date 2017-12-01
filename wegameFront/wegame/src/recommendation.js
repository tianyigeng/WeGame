import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './index.css';

import axios from 'axios';
/**
 * Created by dianazhang on 2017/10/20.
 */

import MenuBar from './menuBar'

class Recommendation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name:'', password:'',showPopup :false,
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};


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

            window.location = "/user/"+this.state.name;
        }
    }

    signup(event) {
        //http://fa17-cs411-47.cs.illinois.edu:8000/addUser/
        //http://0.0.0.0:8000/addUser/
        if (this.state.name !== null && this.state.name !== "" && this.state.password !==null && this.state.password !=="") {
            axios({
                    url: this.state.currUrl+'addUser/',
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {idname: this.state.name, password: this.state.password},
                }
            )
                .then((response) => {
                    this.setState({showPopup: true});
                })
                .catch((error) => {
                    //alert(error);
                    console.log("error");
                });
        }


    }

    render() {
        return (
            <div className="Recommendation">
                <MenuBar wegame="/MainPage" allgame="/AllGame" recom="/Recommendation"  logout={false}/>
                <h1>Recommended Games</h1>
                <p>Log in or Sign up to see the personal recommendation for you! </p>
                <div className="row marketing">
                    <div className="LogOrSign">
                        <form className="form-signin">
                            <h3>Log In Or Sign Up</h3>
                            <br/>
                            <input id="inputName" className="form-control" placeholder="UserId" required onChange={this.handleName}/>
                            <br/>
                            <input id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handlePassword}/>
                            <br/>

                            <button type="button" className="btn btn-info" onClick={this.login}>Log In</button>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-info" onClick={this.signup}>Sign Up</button>
                        </form>
                        <br/>

                    </div>
                </div>
                {this.state.showPopup ?
                    <div className='popup'>
                        <div className='popup_inner'>

                            <h3>Sign Up Successfully, Welcome {this.state.name}!</h3>
                            <Link to={"/user/"+this.state.name} ><button type="button" className="btn btn-info" >My Page</button></Link>
                        </div>
                    </div>
                    : null
                }

            </div>
        );
    }
}
export default Recommendation