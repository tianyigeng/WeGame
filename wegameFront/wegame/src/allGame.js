import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {IndexRoute, browserHistory} from 'react-router';
import './allGame.css';
//import * as axios from "react-dom";
import axios from 'axios';
import FaSearch from 'react-icons/lib/fa/search';

import { Button } from 'reactstrap';
/**
 * Created by dianazhang on 2017/10/20.
 */



import MenuBar from './menuBar'


class allGame extends React.Component {

    //http://fa17-cs411-47.cs.illinois.edu:8000/listGame/
    //http://0.0.0.0:8000/listGame/
    constructor(props) {
        super(props);
        this.state = {value:'', allResult:[],pageResult:[], page:0, maxpage:0,searchGames:'',
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};


        this.allgame();

        this.allgame = this.allgame.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.handleSearch = this.handleSearch.bind(this);


    }
    allgame(event){
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
    }

    handleSearch(event){
        this.setState({searchGames: event.target.value});
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

                <MenuBar wegame="/MainPage" allgame="/AllGame" recom="/Recommendation" logout={false}/>

                <h1>All Games !</h1>

                <div className="green">  </div>

                <div className="pageGames">
                    <div className="pageButton">
                        <Button className="pull-left button" onClick={this.prev}>&#9668;</Button>
                        <Button className="pull-right button" onClick={this.next}>&#9658;</Button>
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


                </div>

                <div className="category">
                    <ul>
                        <li><Button className="catbutton" value="All">All</Button></li>
                        <li><Button className="catbutton" value="Role-Playing">Role-Playing</Button></li>
                        <li><Button className="catbutton" value="Fighting">Fighting</Button></li>
                        <li><Button className="catbutton" value="Action">Action</Button></li>
                        <li><Button className="catbutton" value="Sports">Sports</Button></li>
                        <li><Button className="catbutton" value="Strategy">Strategy</Button></li>
                        <li><Button className="catbutton" value="Shooter">Shooter</Button></li>
                        <li><Button className="catbutton" value="Puzzle">Puzzle</Button></li>
                        <li><Button className="catbutton" value="Simulation">Simulation</Button></li>
                        <li><Button className="catbutton" value="Adventure">Adventure</Button></li>
                        <br/>
                    </ul>

                </div>

                <div className="search">
                <span><input id="searchInput" className="form-control" placeholder="Search For Games!" onChange={this.handleSearch} />
                    &nbsp;<Button className="searchbutton" size="sm" type="submmit" onClick={this.search}><FaSearch/></Button></span>


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