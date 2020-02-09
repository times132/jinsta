import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component{
    render(){
        console.log(this.props)
        return this.props.isLogin ?
            <div>home</div> :
            <Redirect to="/signup"/>;
    };
}

export default Home;