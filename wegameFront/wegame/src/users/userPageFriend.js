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

class UserFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userName:this.props.match.params.uname,friend:this.props.match.params.ufriend,
            userInfo:[], friends:[], games:[],userFriend:false,
            newFriends:"", temp:"",
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"};

        //http://fa17-cs411-47.cs.illinois.edu:8000/userInfo/
        //http://0.0.0.0:8000/userInfo/

        axios.get(this.state.currUrl + "userInfo/"+this.props.match.params.ufriend)
            .then((response) => {
                let jsonuser = JSON.stringify(response.data);
                this.setState({userInfo:JSON.parse(jsonuser)});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });

        axios.get(this.state.currUrl + "userInfoFriends/"+this.props.match.params.uname)
            .then((response) => {
                let jsonbody = JSON.parse(JSON.stringify(response.data));
                let i = 0;
                for(i = 0; i < jsonbody.length; i ++){
                    console.log(jsonbody[i].uid);
                    console.log(this.props.match.params.ufriend);
                    if (jsonbody[i].uid === this.props.match.params.ufriend){
                        this.setState({userFriend:true});
                        break;
                    }
                }

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });


        this.getFriend();
        this.getGame();

        this.getFriend = this.getFriend.bind(this);
        this.getGame = this.getGame.bind(this);
        this.addFriend = this.addFriend.bind(this);

    }

    addFriend(event){

        //http://fa17-cs411-47.cs.illinois.edu:8000/requestFriend/
        //http://0.0.0.0:8000/requestFriend/
        axios({
                    url: this.state.currUrl+'requestFriend/',
                    method: 'post',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {uid1:this.props.match.params.uname,uid2:this.props.match.params.ufriend},
                }
            )
                .then((response) => {


                })
                .catch((error) => {

                });



    }

    getFriend(event){
        // http://fa17-cs411-47.cs.illinois.edu:8000/userInfoFriends/
        // http://0.0.0.0:8000/userInfoFriends/

        axios.get(this.state.currUrl + "userInfoFriends/"+this.props.match.params.ufriend)
            .then((response) => {

                let jsonbody = JSON.parse(JSON.stringify(response.data));
                let i = 0;
                let friend = [];
                for(i = 0; i < jsonbody.length; i ++){
                    console.log(jsonbody[i]);
                    if (jsonbody[i].is_starred === 2){
                        friend.push(jsonbody[i].uid);
                    }
                }
                this.setState({friends:friend});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }

    getGame(event){
        // http://fa17-cs411-47.cs.illinois.edu:8000/userInfoFriends/
        // http://0.0.0.0:8000/userInfoFriends/

        axios.get(this.state.currUrl + "userInfoGames/"+this.props.match.params.ufriend)
            .then((response) => {
                let gameinfos = JSON.stringify(response.data);
                this.setState({games: JSON.parse(gameinfos) });

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }



    render() {
        return (
            <div className="User">


                <MenuBar wegame={"/user/"+this.props.match.params.uname+"/Mainpage"} allgame={"/user/"+this.props.match.params.uname+"/AllGame"} recom={"/user/"+this.props.match.params.uname+"/Recommendation"}  logout={true}/>

                <h1>{this.props.match.params.ufriend}&nbsp;&nbsp;&nbsp;
                    {this.state.userFriend ? null:
                        <Button className="medium ui button addbutton"  type="button" onClick={this.addFriend}>+</Button>
                    }
                </h1>
                <div>
                    <div className="col-md-7 gamehistory">
                        <h2>Game History:</h2>
                            <br/>
                            <div className="gameDiv">
                                <ul className="gameList">
                                    {this.state.games.map((n)=>{
                                        return <li className="game">
                                            <a style={{ textDecoration: 'none', color:'#3d4652' }} href={"https://www.google.com/search?q="+n["name"]} target="_blank"><h4>{n["name"]}</h4></a>

                                            <p>Genre: {n["genre"]} </p>
                                            <p>Platform: {n["platform"]} </p>
                                            <p>Publisher: {n["publisher"]} </p>
                                            <br/><br/>
                                        </li>

                                    })}
                                </ul>
                            </div>

                        <br/>
                    </div>



                    <div className="col-sm-4 friendarea friendFriend">

                            <h3>Friend List: </h3>
                            <br/>
                            <ul className="friendList">
                                {this.state.friends.map((n)=>{
                                    return <li className="friend">
                                        <Link style={{ color:'#3d4652', textDecoration: 'none' }}
                                              to={{pathname: this.props.match.params.uname === n ? "/user/"+this.props.match.params.uname+"/Mainpage":"/user/"+this.props.match.params.uname+"/Friend/"+n, param1:n}} >{n}</Link>

                                        <br/><br/>
                                    </li>

                                })}

                            </ul>

                    </div>

                    <div id="blue">   </div>

                </div>

            </div>
        );
    }
}
export default UserFriend