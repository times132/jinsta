import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoding: false
        }
    }

    render(){
        console.log(this.props)
        return(
            <div>home</div>
        );
    };
}

export default Home;