import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {IndexRoute, browserHistory} from 'react-router';
import './allGame.css';
//import * as axios from "react-dom";
import axios from 'axios';
import games from './20games';

/**
 * Created by dianazhang on 2017/10/20.
 */



import MenuBar from './menuBar'


class allGame extends React.Component {

    //http://fa17-cs411-47.cs.illinois.edu:8000/listGame/
    //http://0.0.0.0:8000/listGame/
    constructor(props) {
        super(props);
        this.state = {value:'', allResult:[],pageResult:[], page:0, maxpage:0};
        axios.get("http://fa17-cs411-47.cs.illinois.edu:8000/listGame/")
            .then((response) => {
                let jsonbody = JSON.stringify(response.data.result);
                this.setState({allResult: JSON.parse(jsonbody)});
                let i = 0;
                for (i = 0; i < 20; i++){
                    let temp = this.state.pageResult;
                    console.log(this.state.allResult[i]);
                    temp.push(this.state.allResult[i]);
                    this.setState({pageResult:temp});
                }
                this.setState({maxpage: this.state.allResult.length/20})

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);


    }


    prev(event) {

        if (this.state.page !== 0){
            let div = document.getElementById("thisPageGame");
            div.innerHTML="";
            let p = this.state.page;
            this.setState({page :p-1});
            this.setState({pageResult:[]});
            let i = (p-1)*20;
            for (i = (p-1)*20; i <(p-1)*20+20; i++){
                let temp = this.state.pageResult;
                console.log(this.state.allResult[i]);
                temp.push(this.state.allResult[i]);
                this.setState({pageResult:temp});
            }
        }

    }

    next(event) {
        if(this.state.page !== this.state.maxpage){
            let div = document.getElementById("thisPageGame");
            div.innerHTML="";
            let p = this.state.page;
            this.setState({page :p+1});
            this.setState({pageResult:[]});
            let i =(p+1)*20;
            for (i = (p+1)*20; i < (p+1)*20+20; i++){
                let temp = this.state.pageResult;
                console.log(this.state.allResult[i]);
                temp.push(this.state.allResult[i]);
                this.setState({pageResult:temp});
            }
        }



    }

    render() {
        return (
            <div className="games">

                <MenuBar wegame="/MainPage" allgame="/AllGame" recom="/Recommendation"  logout={false}/>

                <h1>All Games !</h1>

                <div className="pageButton">
                    <Button className="pull-left" onClick={this.prev}>&#9668;</Button>
                    <Button className="pull-right" onClick={this.next}>&#9658;</Button>
                </div>

                <div id="thisPageGame">
                    {this.state.pageResult.map((n)=>{
                        return <div className="singeGame">
                            <h3>{n.name}</h3>
                            <span>Publisher: {n.publisher}</span>
                            <br/>
                            <span>Year: {n.year}</span>
                            <br/>
                            <span>Genre: {n.genre}</span>

                        </div>
                    })}

                </div>


                <div className="pageButton">
                    <Button className="pull-left" onClick={this.prev}>&#9668;</Button>
                    <Button className="pull-right" onClick={this.next} >&#9658;</Button>
                </div>

            </div>


        );
    }

}


export default allGame
/*
 {this.state.allResult.map((n)=>{
 return <div className="singeGame">
 <h3>{n.name}</h3>
 <span>Publisher: {n.publisher}</span>
 <br/>
 <span>Year: {n.year}</span>
 <br/>
 <span>Genre: {n.genre}</span>

 </div>
 })}
 */