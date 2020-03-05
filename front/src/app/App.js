import React from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import { getCurrentUser } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";

import Profile from "../user/profile/Profile";
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Home from '../user/Home';
import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicator';

import { Layout, notification } from "antd";
const { Content } = Layout;


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            open: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
                console.log("currentuser");
            }).catch(error => {
                this.setState({
                    isLoading: false
                });
                console.log("not currentuser");
        });

    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out."){
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Jinstagram',
            description: description,
        });
    }

    handleLogin(){
        notification.success({
            message: 'Jinstagram',
            description: "You're successfully logged in.",
        });

        this.loadCurrentUser();
        this.props.history.push("/");
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.loadCurrentUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const loggedInfo = localStorage.getItem(ACCESS_TOKEN);
        console.log("loggedInfo : ", loggedInfo);
    }

    render() {
        let re = /(signin|signup)/;
        let isAuth = re.test(this.props.location.pathname);
        console.log("render");
        if (this.state.isLoading){
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <div className="appheader"> {/* 로그인, 회원가입에는 AppHeader 비활성화 */}
                    {isAuth ? undefined : <AppHeader
                        isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        onLogout={this.handleLogout}/>}
                </div>

                <Content className="app-content">
                    <div className="container">
                        <Switch>
                            <Route exact path="/" render={(props) => <Home isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props}/>}/>
                            <Route path="/signin" render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/:username" render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}/>}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default withRouter(App);