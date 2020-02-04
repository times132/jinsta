import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import './AppHeader.css';
import { AppBar, Toolbar, Link, InputBase, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Menu, Dropdown, Icon } from "antd";
import jinsta from "../picture/jinsta.png"
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️
        MuiTypography: {
            // The default props to change
            root: {
                marginRight: "20px",
            },
        },
    },
});

class AppHeader extends React.Component{
    constructor(props){
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}){
        if (key === "logout"){
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/poll/new">
                    <Link to="/poll/new">

                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        }else{
            menuItems = [
                <ThemeProvider theme={theme}>
                    <Link component={RouterLink} underline="none" to="/login">
                        <Button variant="outlined" color="primary" size="small">로그인</Button>
                    </Link>
                    <Link component={RouterLink} underline="none" to="/">
                        가입하기
                    </Link>
                </ThemeProvider>
                // <Menu.Item key="/login">
                //     <Link to="/login">로그인</Link>
                // </Menu.Item>,
                // <Menu.Item key="/signup">
                //     <Link to="/">가입하기</Link>
                // </Menu.Item>
            ];
        }

        return (
            <AppBar position="fixed" color="inherit" elevation={0} className="appbar">
                <Toolbar className="toolbar">
                    <div className="oJZym">
                        <a href="/home">
                            <div className="oJZym">
                                <svg aria-label="Jinstagram" className="_8-yf5" fill="#262626" height="25" viewBox="0 0 50 50" width="25">
                                    <path d="M13.86.13A17 17 0 008 1.26 11 11 0 003.8 4 12.22 12.22 0 001 8.28 18 18 0 00-.11 14.1c-.13 2.55-.13 3.38-.13 9.9s0 7.32.13 9.9A18 18 0 001 39.72 11.43 11.43 0 003.8 44 12.17 12.17 0 008 46.74a17.75 17.75 0 005.82 1.13c2.55.13 3.38.13 9.9.13s7.32 0 9.9-.13a17.82 17.82 0 005.83-1.13A11.4 11.4 0 0043.72 44a11.94 11.94 0 002.78-4.24 17.7 17.7 0 001.13-5.82c.13-2.55.13-3.38.13-9.9s0-7.32-.13-9.9a17 17 0 00-1.13-5.86A11.31 11.31 0 0043.72 4a12.13 12.13 0 00-4.23-2.78A17.82 17.82 0 0033.66.13C31.11 0 30.28 0 23.76 0s-7.31 0-9.9.13m.2 43.37a13.17 13.17 0 01-4.47-.83 7.25 7.25 0 01-2.74-1.79 7.25 7.25 0 01-1.79-2.74 13.23 13.23 0 01-.83-4.47c-.1-2.52-.13-3.28-.13-9.7s0-7.15.13-9.7a12.78 12.78 0 01.83-4.44 7.37 7.37 0 011.79-2.75A7.35 7.35 0 019.59 5.3a13.17 13.17 0 014.47-.83c2.52-.1 3.28-.13 9.7-.13s7.15 0 9.7.13a12.78 12.78 0 014.44.83 7.82 7.82 0 014.53 4.53 13.12 13.12 0 01.83 4.44c.13 2.51.13 3.27.13 9.7s0 7.15-.13 9.7a13.23 13.23 0 01-.83 4.47 7.9 7.9 0 01-4.53 4.53 13 13 0 01-4.44.83c-2.51.1-3.28.13-9.7.13s-7.15 0-9.7-.13m19.63-32.34a2.88 2.88 0 102.88-2.88 2.89 2.89 0 00-2.88 2.88M11.45 24a12.32 12.32 0 1012.31-12.35A12.33 12.33 0 0011.45 24m4.33 0a8 8 0 118 8 8 8 0 01-8-8"></path>
                                </svg>
                                <div className="SvO5t"></div>
                                <div className="cq2ai">
                                    <img src={jinsta} className="s4Iyt" alt="jinstagram"/>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="search">
                        <div className="searchIcon"><SearchIcon/></div>
                        <InputBase
                            placeholder="검색"
                            inputProps={{"aria-label": "search"}}
                            classes={{root: 'inputRoot', input: "inputInput"}}>

                        </InputBase>
                    </div>
                    {menuItems}
                </Toolbar>
            </AppBar>
            // <Header className="app-header" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            //     <div className="container">
            //         <div className="app-title">
            //             <Link to="/">Jinstagram</Link>
            //         </div>
            //         <Menu
            //             className="app-menu"
            //             mode="horizontal"
            //             selectedKeys={[this.props.location.pathname]}
            //             style={{lineHeight: '64px'}}>
            //                 {menuItems}
            //         </Menu>
            //     </div>
            // </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return(
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/><Icon type="down"/>
            </a>
        </Dropdown>
    );
}
export default withRouter(AppHeader)