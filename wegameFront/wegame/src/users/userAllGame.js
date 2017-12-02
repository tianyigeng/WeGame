import React, { Component } from 'react'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {IndexRoute, browserHistory} from 'react-router';

//import * as axios from "react-dom";
import axios from 'axios';
import { Button } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


/**
 * Created by dianazhang on 2017/10/20.
 */
import '../allGame.css';
import gamesList from '../gamesList';

import MenuBar from '../menuBar';


class userAllGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:'', allResult:[],pageResult:[], page:0, maxpage:0,
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};

        axios.get(this.state.currUrl+"listGame/")
            .then((response) => {
                let jsonbody = JSON.stringify(response.data.result);
                this.setState({allResult: JSON.parse(jsonbody)});
                let i = 0;
                for (i = 0; i < 30; i++){
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
            let i = (p-1)*30;
            for (i = (p-1)*30; i <(p-1)*30+30; i++){
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
            let i =(p+1)*30;
            for (i = (p+1)*30; i < (p+1)*30+30; i++){
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

                <MenuBar wegame={"/user/"+this.props.match.params.uname+"/Mainpage"} allgame={"/user/"+this.props.match.params.uname+"/AllGame"} recom={"/user/"+this.props.match.params.uname+"/Recommendation"}  logout={true}/>

                <h1>All Games !</h1>

                <gamesList allGames={this.state.allResult} />


            </div>


        );
    }

}


export default userAllGame


/*
 <div className="pageButton">
 <Button className="pull-left button" onClick={this.prev}>&#9668;</Button>
 <Button className="pull-right button" onClick={this.next}>&#9658;</Button>
 </div>

 <div className="pageGames">
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


 </div>
 */