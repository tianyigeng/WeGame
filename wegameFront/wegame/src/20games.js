import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './index.css';
//import * as axios from "react-dom";
import axios from 'axios';
/**
 * Created by dianazhang on 2017/10/20.
 */





class games extends React.Component {

    render() {

        var gamePage = [];
        var i = this.props.page*20;
        for (i = this.props.page*20; i < this.props.page*20+20 ; i++) {
            gamePage.push(this.props.allGames[i]);
        }


        return (
            <div className="MainPage">
                <h1>All Games !</h1>


                <div>
                    {this.props.allResult.map((n)=>{
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
        );
    }

}




export default games