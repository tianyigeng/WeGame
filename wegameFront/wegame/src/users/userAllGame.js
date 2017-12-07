import React, { Component } from 'react'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {IndexRoute, browserHistory} from 'react-router';

//import * as axios from "react-dom";
import axios from 'axios';
import { Button } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import FaSearch from 'react-icons/lib/fa/search';

/**
 * Created by dianazhang on 2017/10/20.
 */
import '../allGame.css';

import MenuBar from '../menuBar';


class userAllGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:'', allResult:[],pageResult:[], page:0, maxpage:0,keyWord:'',
            userPlayed:[],
            currUrl: (window.location.href.indexOf("illinois") !== -1) ? "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};

        this.played();
        this.allgame();

        this.allgame = this.allgame.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.genregame = this.genregame.bind(this);
        this.search = this.search.bind(this);
        this.addgame = this.addgame.bind(this);
        this.played = this.played.bind(this);


    }

    played(event){
        axios.get(this.state.currUrl + "userInfoGames/"+this.props.match.params.uname)
            .then((response) => {
                let userGames = JSON.parse(JSON.stringify(response.data));

                console.log(userGames);
                let played = [];
                let i = 0;

                for (i = 0; i < userGames.length; i++){
                    played.push(userGames[i].gid);
                }
                this.setState({userPlayed: played });
                console.log(this.state.userPlayed.indexOf('7226'))
            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });


    }

    addgame(event){

        axios({
                url: this.state.currUrl+"userAddGame/",
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {uid:this.props.match.params.uname, gid:event.target.value},
            }
        )
            .then((response) => {

                //event.style.visibility = 'hidden';
            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });

        window.location.reload();


    }

    allgame(event){
        axios.get(this.state.currUrl+"listGame/")
            .then((response) => {
                let jsonbody = JSON.stringify(response.data.result);
                this.setState({allResult: JSON.parse(jsonbody)});
                let i = 0;
                let page = [];
                for (i = 0; i < 500; i++){
                    page.push(this.state.allResult[i]);
                }
                this.setState({pageResult:page});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }

    search(event){
        axios({
                url: this.state.currUrl+"fuzzyQuery/",
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {name:this.state.keyWord},
            }
        )
            .then((response) => {
                let jsonbody = JSON.stringify(response.data);
                this.setState({allResult: JSON.parse(jsonbody)});
                let i = 0;
                let page = [];
                for (i = 0; i < this.state.allResult.length; i++){
                    page.push(this.state.allResult[i]);
                }
                this.setState({pageResult:page});
                console.log(page);
                this.setState({keyWord:""});
                let input = document.getElementById('searchInput');
                input.value = '';

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }

    genregame(event){


        axios({
                url: this.state.currUrl+"sameGenreGames/",
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {genre:event.target.value},
            }
        )
            .then((response) => {
                let jsonbody = JSON.stringify(response.data);
                this.setState({allResult: JSON.parse(jsonbody)});
                let i = 0;
                let page = [];
                for (i = 0; i < 500; i++){
                    page.push(this.state.allResult[i]);
                }
                this.setState({pageResult:page});
                this.setState({maxpage: this.state.allResult.length/30})

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });




    }

    handleSearch(event){
        this.setState({keyWord: event.target.value});
    }


    render() {
        return (
            <div className="games">

                <MenuBar wegame={"/user/"+this.props.match.params.uname+"/Mainpage"} allgame={"/user/"+this.props.match.params.uname+"/AllGame"} recom={"/user/"+this.props.match.params.uname+"/Recommendation"}  logout={true}/>

                <h1>All Games ! </h1>

                <div className="green">  </div>

                <div className="pageGames">
                    <div id="thisPageGame">


                        {this.state.pageResult.map((n)=>{
                            return <div className="singeGame">
                                {
                                    this.state.userPlayed.indexOf(n.gid.toString()) >= 0 ? null:
                                        <Button id={n.gid} className="medium ui button pull-right addgameButton" value={n.gid} onClick={this.addgame}>+</Button>

                                }
                                <a style={{ textDecoration: 'none', color:'#fcfcfe' }} href={"https://www.google.com/search?q="+n.name} target="_blank"><h3>{n.name}</h3></a>
                                <span>Publisher: {n.publisher}</span>
                                <br/>
                                <span>Year: {n.year}</span>
                                <br/>
                                <span>Genre: {n.genre}</span>
                                <br/>
                                <span>GID: {n.gid}</span>

                            </div>
                        })}

                    </div>


                </div>


                <div className="category">
                        <ul>
                            <li><Button className="catbutton" onClick={this.allgame} value="All">All</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Role-Playing">Role-Playing</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Fighting">Fighting</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Action">Action</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Sports">Sports</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Strategy">Strategy</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Shooter">Shooter</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Puzzle">Puzzle</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Simulation">Simulation</Button></li>
                            <li><Button className="catbutton" onClick={this.genregame} value="Adventure">Adventure</Button></li>
                            <br/>
                        </ul>

                </div>

                <div className="search">
                <span><input id="searchInput" className="form-control" placeholder="Search For Games!" onChange={this.handleSearch} />
                    &nbsp;<Button className="searchbutton" size="sm" type="button" onClick={this.search}><FaSearch/></Button></span>


                </div>


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
 */

/*
 let jsonbody = JSON.stringify(response.data.result);
 this.setState({allResult: JSON.parse(jsonbody)});
 let i = 0;
 this.setState({page:0});
 for (i = 0; i < 30; i++){
 let temp = this.state.pageResult;
 console.log(this.state.allResult[i]);
 temp.push(this.state.allResult[i]);
 this.setState({pageResult:temp});
 }
 this.setState({maxpage: this.state.allResult.length/30})

 /*
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
 */
