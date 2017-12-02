import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';

import { Button } from 'reactstrap';
import './userPage.css';
import axios from 'axios';
/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from '../menuBar';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userName:this.props.match.params.uname, userInfo:[], friends:[], games:[], gamesName:[], gamesGenre:[], gamesID:[],
            newFriends:"", temp:"",
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};

        //http://fa17-cs411-47.cs.illinois.edu:8000/userInfo/
        //http://0.0.0.0:8000/userInfo/

        axios.get(this.state.currUrl + "userInfo/"+this.props.match.params.uname)
            .then((response) => {
                let jsonuser = JSON.stringify(response.data);
                this.setState({userInfo:JSON.parse(jsonuser)});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });




        this.getFriend();
        this.getGame();

        this.addFriend = this.addFriend.bind(this);
        this.handleFriend = this.handleFriend.bind(this);
        this.getFriend = this.getFriend.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.getGame = this.getGame.bind(this);

    }

    getFriend(event){
        // http://fa17-cs411-47.cs.illinois.edu:8000/userInfoFriends/
        // http://0.0.0.0:8000/userInfoFriends/

        axios.get(this.state.currUrl + "userInfoFriends/"+this.props.match.params.uname)
            .then((response) => {
                this.setState({friends:response.data});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }

    getGame(event){
        // http://fa17-cs411-47.cs.illinois.edu:8000/userInfoFriends/
        // http://0.0.0.0:8000/userInfoFriends/

        axios.get(this.state.currUrl + "userInfoGames/"+this.props.match.params.uname)
            .then((response) => {
                let gameinfos = JSON.stringify(response.data);
                this.setState({games: JSON.parse(gameinfos) });

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }

    handleFriend(event){
        this.setState({newFriends: event.target.value});
    }

    deleteFriend(event){

        //http://fa17-cs411-47.cs.illinois.edu:8000/deleteFriend/
        //http://0.0.0.0:8000/deleteFriend/

        axios({
                url: this.state.currUrl+'deleteFriend/',
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:{uid1:this.props.match.params.uname, uid2:event.target.value},
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



    addFriend(event){

        //http://fa17-cs411-47.cs.illinois.edu:8000/addFriend/
        //http://0.0.0.0:8000/addFriend/


        if(this.state.newFriends !==""){
            axios({
                    url: this.state.currUrl+'addFriend/',
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {uid1:this.props.match.params.uname,uid2:this.state.newFriends},
                }
            )
                .then((response) => {
                    alert("success");

                })
                .catch((error) => {
                    //alert(error);
                    console.log("error");
                });

            this.getFriend();
        }



    }

    render() {
        return (
            <div className="User">


                <MenuBar wegame={"/user/"+this.props.match.params.uname+"/Mainpage"} allgame={"/user/"+this.props.match.params.uname+"/AllGame"} recom={"/user/"+this.props.match.params.uname+"/Recommendation"}  logout={true}/>

                <h1>{this.state.userInfo.uid}</h1>
                <div>
                    <div className="col-md-7 gamehistory">
                        <h2>Game History:</h2>
                            <br/>
                            <div className="gameDiv">
                                <ul className="gameList">
                                    {this.state.games.map((n)=>{
                                        return <li className="game">
                                            <h4>{n["name"]}</h4>
                                            <p>Genre:{n["genre"]} </p>
                                            <br/><br/>
                                        </li>

                                    })}
                                </ul>
                            </div>

                        <br/>
                    </div>



                    <div className="col-sm-4 friendarea">
                        <form className="form-signin">
                            <h3>Friend List: </h3>

                            <br/>
                            <span><input id="friendId" className="form-control" placeholder="UserId" onChange={this.handleFriend} />
                                &nbsp;&nbsp;&nbsp;<Button className="button" size="sm" type="submmit" onClick={this.addFriend}>+</Button></span>

                            <br/>
                            <br/>
                            <ul className="friendList">
                            {this.state.friends.map((n)=>{
                                return <li className="friend">
                                    {n}
                                    <Button className="deletebutton pull-right" type="submmit" size="sm" value={n} onClick={this.deleteFriend}>-</Button>
                                    <br/><br/>
                                </li>

                            })}
                            </ul>
                        </form>


                    </div>

                    <div id="blue">   </div>

                </div>

            </div>
        );
    }
}
export default User