import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';

import { Button,ButtonDropdown } from 'semantic-ui-react';
import './userPage.css';
import axios from 'axios';
/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from '../menuBar';
import MdCheck from 'react-icons/lib/md/check';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.match.params.uname, popup: false, popupRequest:false, delete:"", message:"",
            userInfo: [], friends: [], requestFriends: [],games: [], gamesName: [], gamesGenre: [], gamesID: [],
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
        this.confirmFriend = this.confirmFriend.bind(this);
        this.handleFriend = this.handleFriend.bind(this);
        this.getFriend = this.getFriend.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.getGame = this.getGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);

        this.closePop = this.closePop.bind(this);
        this.openPop = this.openPop.bind(this);
        this.closePopRequest = this.closePopRequest.bind(this);
        this.openPopRequest = this.openPopRequest.bind(this);

    }


    closePop(event){
        this.setState({popup: false})
    }

    openPop(event){
        this.setState({delete: event.target.value});
        this.setState({popup: true})
    }

    closePopRequest(event){
        let input = document.getElementById('friendId');
        input.value = '';
        this.setState({popupRequest: false})
    }

    openPopRequest(event){
        this.setState({popupRequest: true})
    }

    getFriend(event){
        // http://fa17-cs411-47.cs.illinois.edu:8000/userInfoFriends/
        // http://0.0.0.0:8000/userInfoFriends/

        axios.get(this.state.currUrl + "userInfoFriends/"+this.props.match.params.uname)
            .then((response) => {
                let jsonbody = JSON.parse(JSON.stringify(response.data));
                let i = 0;
                let friend = [];
                let reqfriend = [];
                for(i = 0; i < jsonbody.length; i ++){
                    console.log(jsonbody[i]);
                    if (jsonbody[i].is_starred === 1){
                        reqfriend.push(jsonbody[i].uid);
                    }
                    else{
                        friend.push(jsonbody[i].uid);
                    }
                }
                this.setState({friends:friend});
                this.setState({requestFriends:reqfriend});

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

        //http://fa17-cs411-47.cs.illinois.edu:8000/requestFriend/
        //http://0.0.0.0:8000/requestFriend/


        if(this.state.newFriends !=="" && this.state.newFriends !== this.props.match.params.uname){
            axios({
                    url: this.state.currUrl+'requestFriend/',
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {uid1:this.props.match.params.uname,uid2:this.state.newFriends},
                }
            )
                .then((response) => {
                    //alert("success");
                    let jsonresult = JSON.parse(JSON.stringify(response.data));
                    console.log(jsonresult.uid1);
                    if(jsonresult.uid1 === null || jsonresult.uid1 === 'undefined' || jsonresult.uid1.length < 1){
                        this.setState({message: "User Nonexist"});
                    }
                    else{
                        this.openPopRequest();
                    }

                })
                .catch((error) => {
                    //alert(error);
                    this.setState({message: "User Nonexist"});
                    console.log("error");
                });

        }

    }

    confirmFriend(event){

        axios({
                url: this.state.currUrl+'confirmFriend/',
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {uid1:this.props.match.params.uname,uid2:event.target.value},
            }
        )
            .then((response) => {
                //alert("success");

            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });

        this.getFriend();

    }

    deleteGame(event){

        //http://fa17-cs411-47.cs.illinois.edu:8000/deleteFriend/
        //http://0.0.0.0:8000/deleteFriend/

        axios({
                url: this.state.currUrl+'userDeleteGame/',
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:{uid:this.props.match.params.uname, gid: event.target.value},
            }
        )
            .then((response) => {

                //alert("success");
            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });
        
        window.location.reload();

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
                                            <Button className="medium ui button pull-left deleteGamebutton" type="button"  value={n['gid']} onClick={this.deleteGame}>-</Button>

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
                                &nbsp;&nbsp;&nbsp;<Button className="medium ui button addbutton"  type="button" onClick={this.addFriend}>+</Button></span>
                            <br/><br/>

                            <ul className="friendList">
                                {this.state.friends.map((n)=>{
                                    return <li className="friend">
                                        <Link style={{ color:'#3d4652', textDecoration: 'none' }} to={{pathname: "/user/"+this.props.match.params.uname+"/Friend/"+n, param1:n}} >{n}</Link>
                                        <Button className="medium ui button pull-right deletebutton" type="button"  value={n} onClick={this.openPop}>-</Button>

                                        <br/><br/>
                                    </li>

                                })}

                            </ul>

                        </form>

                    </div>


                    <div className="friendRequest">
                        <h4>Friend request: </h4>
                        <ul className="friendRequestList">
                            {this.state.requestFriends.map((n)=>{
                                return <li className="friend">
                                    <Link style={{ color:'#fcfcfe', textDecoration: 'none' }} to={{pathname: "/user/"+this.props.match.params.uname+"/Friend/"+n, param1:n}} >{n}</Link>
                                    <Button className="medium ui button pull-right comfirmButton" type="button" size="sm" value={n} onClick={this.confirmFriend}>&#10003;</Button>

                                    <br/><br/>
                                </li>

                            })}

                        </ul>

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

                {this.state.popupRequest ?
                    <div className='popup'>
                        <div className='popup_inner'>
                            <br/><br/>
                            <h3>Send friend request to {this.state.newFriends} !</h3>
                            <br/><br/>
                            <Button className="button" type="submit" onClick={this.closePopRequest}>Ok</Button>
                        </div>
                    </div>
                    : null
                }



            </div>
        );
    }
}
export default User

/*
 {this.state.friends.map((n)=>{
 return <li className="friend">
 <Link style={{ color:'#3d4652', textDecoration: 'none' }} to={{pathname: "/user/"+this.props.match.params.uname+"/Friend/"+n, param1:n}} >{n}</Link>
 <Button className="deletebutton pull-right" type="button" size="sm" value={n} onClick={this.openPop}>-</Button>

 <br/><br/>
 </li>

 })}
 */