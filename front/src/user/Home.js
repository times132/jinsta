import React from 'react';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoding: false
        }
    }

    render(){
        console.log("home render")
        return(
            <div>home</div>
        );
    };
}

export default Home;