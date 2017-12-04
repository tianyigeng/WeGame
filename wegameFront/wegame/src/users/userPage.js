import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';

import { Button,ButtonDropdown } from 'reactstrap';
import './userPage.css';
import axios from 'axios';
/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from '../menuBar';


class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.match.params.uname, popup: false, delete:"", message:"",
            userInfo: [], friends: [], games: [], gamesName: [], gamesGenre: [], gamesID: [],
            newFriends: "", temp: "",
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"
        };

        //http://fa17-cs411-47.cs.illinois.edu:8000/userInfo/
        //http://0.0.0.0:8000/userInfo/

        axios.get(this.state.currUrl + "userInfo/" + this.props.match.params.uname)
            .then((response) => {
                let jsonuser = JSON.stringify(response.data);
                this.setState({userInfo: JSON.parse(jsonuser)});

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

        this.closePop = this.closePop.bind(this);
        this.openPop = this.openPop.bind(this);

    }


    closePop(event){
        this.setState({popup: false})
    }

    openPop(event){
        this.setState({delete: event.target.value});
        this.setState({popup: true})
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
                data:{uid1:this.props.match.params.uname, uid2: this.state.delete},
            }
        )
            .then((response) => {
                this.setState({delete: ""});
                this.setState({popup: false});
                //alert("success");
            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });


        this.setState({delete: ""});
        this.setState({popup: false});
        window.location.reload();

        }



    addFriend(event){

        //http://fa17-cs411-47.cs.illinois.edu:8000/addFriend/
        //http://0.0.0.0:8000/addFriend/


        if(this.state.newFriends !=="" && this.state.newFriends !== this.props.match.params.uname){
            axios({
                    url: this.state.currUrl+'addFriend/',
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {uid1:this.props.match.params.uname,uid2:this.state.newFriends},
                }
            )
                .then((response) => {
                    //alert("success");
                    let jsonresult = JSON.parse(JSON.stringify(response.data));
                    console.log(jsonresult);
                    if(jsonresult.uid1 === null){
                        this.setState({message: "User Nonexist"})
                    }

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


                <div className="col-md-7 gamehistory">
                    <div id="blue">   </div>
                    <div id="blueupper">
                        <h2>Game History:</h2>
                            <br/>
                            <div className="gameDiv">
                                <ul className="gameList">
                                    {this.state.games.map((n)=>{
                                        return <li className="game">
                                            <h4>{n["name"]}</h4>
                                            <p>Genre: {n["genre"]} </p>
                                            <p>Platform: {n["platform"]} </p>
                                            <p>Publisher: {n["publisher"]} </p>
                                            <br/><br/>
                                        </li>

                                    })}
                                </ul>
                            </div>
                    </div>
                    <br/>
                </div>


                <div className="col-sm-4 friendOuter">
                    <div className=" friendarea">
                        <form className="form-signin">
                            <h3>Friend List: </h3>

                            <br/>
                            <span><input id="friendId" className="form-control" placeholder="UserId" onChange={this.handleFriend} />
                                &nbsp;&nbsp;&nbsp;<Button className="button" size="sm" type="submit" onClick={this.addFriend}>+</Button></span>
                            <br/><br/>

                            <ul className="friendList">
                            {this.state.friends.map((n)=>{
                                return <li className="friend">
                                    <Link style={{ color:'#3d4652', textDecoration: 'none' }} to={{pathname: "/user/"+this.props.match.params.uname+"/Friend/"+n, param1:n}} >{n}</Link>
                                    <Button className="deletebutton pull-right" type="button" size="sm" value={n} onClick={this.openPop}>-</Button>

                                    <br/><br/>
                                </li>

                            })}
                            </ul>

                        </form>

                    </div>


                    <div className="friendRequest">
                        <h4>Friend request: </h4>
                    </div>
                </div>

                    {this.state.popup ?
                        <div className='popup'>
                            <div className='popup_inner'>
                                <br/><br/>
                                <h3>No longer be friends with</h3> <h3>{this.state.delete} ?</h3>
                                <br/><br/>
                                <Button className="button" type="button" onClick={this.deleteFriend}>Yes</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button className="button" type="submit" onClick={this.closePop}>No</Button>
                            </div>
                        </div>
                        : null
                    }




            </div>
        );
    }
}
export default User