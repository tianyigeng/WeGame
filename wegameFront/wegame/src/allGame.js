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
    constructor(props) {
        super(props);
        this.state = {value:'', allResult:[],pageResult:[], page:0, maxpage:0,keyWord:'',
            currUrl: (window.location.href.indexOf("illinois") !== -1) ? "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};

        this.allgame();

        this.allgame = this.allgame.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.genregame = this.genregame.bind(this);
        this.search = this.search.bind(this);


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

                <MenuBar wegame="/MainPage" allgame="/AllGame" recom="/Recommendation" logout={false}/>

                <h1>All Games ! </h1>

                <div className="green">  </div>

                <div className="pageGames">
                    <div id="thisPageGame">


                        {this.state.pageResult.map((n)=>{
                            return <div className="singeGame">
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