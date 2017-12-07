import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './recommendation.css';
import axios from 'axios';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/**
 * Created by dianazhang on 2017/10/20.
 */


import MenuBar from '../menuBar';

class userRecommendation extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recommendation:[],
            currUrl: (window.location.href.indexOf("illinois") !== -1) ?
                "http://fa17-cs411-47.cs.illinois.edu:8000/" : "http://0.0.0.0:8000/"
        };

        axios({
                url: this.state.currUrl+'recommendation/',
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:{uid:this.props.match.params.uname},
            }
        )
            .then((response) => {
                let recJson = JSON.parse(JSON.stringify(response.data));
                let i = 0;
                let rec = [];
                for (i = 0; i < recJson.length; i++){
                    rec.push(recJson[i].uid2);
                }
                this.setState({recommendation: rec});

            })
            .catch((error) => {
                //alert(error);
                console.log("error");
            });

    }




    render() {
        return (
            <div className="Recommendation">
                <MenuBar wegame={"/user/"+this.props.match.params.uname+"/Mainpage"} allgame={"/user/"+this.props.match.params.uname+"/AllGame"} recom={"/user/"+this.props.match.params.uname+"/Recommendation"}  logout={true}/>

                <h1>Recommended Games</h1>
                <p>Our recommendations are based on your game history.</p>

                <div className="hotGame">
                    <h3>Hottest Game</h3>

                    <div className="pic">   </div>
                </div>

                <div className="recomFriends">
                    <h3>You may want be friends with ...</h3>

                        <br/>
                        <ul className="recFriendList">
                            {this.state.recommendation.map((n)=>{
                                return <li className="recFriend">
                                    <Link style={{ color:'#3d4652', textDecoration: 'none' }}
                                          to={{pathname: "/user/"+this.props.match.params.uname+"/Friend/"+n, param1:n}} >{n}</Link>

                                    <br/><br/>
                                </li>

                            })}

                        </ul>


                </div>

            </div>
        );
    }
}
export default userRecommendation

//<img src={'../../../../wordcloud/out.png'} alt="Hottest Game" className="WordCloud"/>