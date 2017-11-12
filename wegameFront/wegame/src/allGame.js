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





class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:'', result:[]};
        axios.get("http://0.0.0.0:8000/listGame/")
            .then((response) => {
                //alert(response);
                //console.log(JSON.stringify(response.data));
                this.setState({result: JSON.stringify(response.data)});
            })
            .catch((error) => {
                alert(error);
                console.log("error");
            });
    }




    render() {
        return (
            <div className="MainPage">
                <h1>All Games !</h1>


                <div>{this.state.result}</div>


            </div>
        );
    }

}




export default MainPage