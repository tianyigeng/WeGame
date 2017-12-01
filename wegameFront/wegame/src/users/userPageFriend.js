import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './userPage.css';
import axios from 'axios';
/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from '../menuBar';

class userPageFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userName:this.props.match.params.uname, userInfo:[], friends:[], games:[],newFriends:"", temp:""};

        //http://fa17-cs411-47.cs.illinois.edu:8000/userInfo/
        //http://0.0.0.0:8000/userInfo/
        axios.get("http://fa17-cs411-47.cs.illinois.edu:8000/userInfo/"+this.props.match.params.uname)
            .then((response) => {
                let jsonuser = JSON.stringify(response.data);
                this.setState({userInfo:JSON.parse(jsonuser)});

            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });


        this.getFriend();

        this.addFriend = this.addFriend.bind(this);
        this.handleFriend = this.handleFriend.bind(this);
        this.getFriend = this.getFriend.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);

    }

    getFriend(event){
        axios.get("http://0.0.0.0:8000/userInfoFriends/"+this.props.match.params.uname)
            .then((response) => {
                this.setState({friends:response.data});

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

        axios({
                url: 'http://0.0.0.0:8000/deleteFriend/',
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

        if(this.state.newFriends !==""){
            axios({
                    url: 'http://0.0.0.0:8000/addFriend/',
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
                <div className="row marketing">
                    <div className="col-lg-6 logsign">
                        <form className="form-signin">
                            <h3>Friend List: </h3>


                            <br/>
                            <ul className="friendList">
                            {this.state.friends.map((n)=>{
                                return <li className="friend">
                                    <button className="btn pull-right btn-sm btn-outline-danger" value={n} onClick={this.deleteFriend}>-</button>
                                    {n}
                                    <br/><br/>
                                </li>

                            })}
                            </ul>
                        </form>


                    </div>
                    <div class="col-lg-6">
                        <form class="form-signin">
                            <h3>Game History:</h3>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}
export default userPageFriend