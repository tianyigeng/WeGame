import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {IndexRoute, browserHistory} from 'react-router';
import './userPage.css';
/**
 * Created by dianazhang on 2017/10/20.
 */



class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userName: ''};
        this.setState({userName : this.props.location.param1})
    }

    render() {
        return (
            <div className="User">

                <h1>Name: {this.state.userName}</h1>
                <div className="row marketing">
                    <div className="col-lg-6 logsign">
                        <form className="form-signin">
                            <h3>Friend List: </h3>
                            <br/>
                            <span><input id="friendId" className="form-control" placeholder="UserId" required />
                                &nbsp;&nbsp;&nbsp;<button className="btn btn-info" >+</button></span>
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
export default User