import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {IndexRoute, browserHistory} from 'react-router';
import './allUsers.css';
//import * as axios from "react-dom";
import axios from 'axios';

/**
 * Created by dianazhang on 2017/10/20.
 */





class allGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:'', allUser:[],
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};
        //"http://fa17-cs411-47.cs.illinois.edu:8000/GetUsers/"
        //"http://0.0.0.0:8000/GetUsers/"
        axios.get(this.state.currUrl+"GetUsers/")
            .then((response) => {
                let jsonuser = JSON.stringify(response.data);
                this.setState({allUser:JSON.parse(jsonuser)});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });


    }



    render() {
        return (
            <div className="allUsers">
                <h1>All Users</h1>

                <div id="thisPageGame">
                    {this.state.allUser.map((n)=>{
                        return <div className="singleUser">
                            <h4> ID: {n.uid} &nbsp;&nbsp;&nbsp; Name: {n.name} </h4>
                        </div>
                    })}


                </div>

            </div>


        );
    }

}


export default allGame
/*
 {this.state.allUser.map((n)=>{
 return <div className="singleUser">
 <h3>{n}</h3>

 </div>
 })}
 */