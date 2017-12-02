import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './mainPage.css';
import axios from 'axios';
import { Button } from 'reactstrap';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import FaEye from 'react-icons/lib/fa/eye';

import PasswordMask from 'react-password-mask';


/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from './menuBar';

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <br/><br/>
                    <h3>Sign Up Successfully, Welcome {this.props.name}!</h3>
                    <br/><br/>
                    <Link to={"/user/"+this.props.name+"/Mainpage"} ><Button className="button" type="button" >My Page</Button></Link>
                </div>
            </div>
        );
    }
}



class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name:'', password:'',showPopup:false,view:false,
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"

        };


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
        if (this.state.name !== null && this.state.name !== "" && this.state.password !==null && this.state.password !==""){

            window.location = "/user/"+this.state.name+"/Mainpage";
        }
    }

    signup(event) {
        //http://fa17-cs411-47.cs.illinois.edu:8000/addUser/
        //http://0.0.0.0:8000/addUser/

        if (this.state.name !== null && this.state.name !== "" && this.state.password !==null && this.state.password !==""){
            axios({
                    url: this.state.currUrl+"addUser/",
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
                            <form className="form-signin">
                                <h3>Log In Or Sign Up</h3>
                                <br/>
                                <input id="inputName" className="form-control" placeholder="UserId" required onChange={this.handleName}/>

                                <br/>
                                <span><input id="inputPassword" className="form-control" placeholder="Password" onChange={this.handlePassword} /></span>


                                <br/> <br/>

                                <Button className="button" type="button" onClick={this.login}>Log In</Button>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button className="button" type="button" onClick={this.signup}>Sign Up</Button>
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

 <Button id="eye" type="button" onClick={this.view}>{
 this.state.view ? <FaEye className="eyeicon"/> : <FaEyeSlash className="eyeicon"/>
 }</Button>



 <input id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handlePassword} />
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