import React from 'react';
import { Spin } from 'antd';
import Loading from "../picture/loading.png";

export default function LoadingIndicator(props){
    const LoadingIcon = <img src={Loading} style={{position: "absolute", width: "50px", height: "50px", top: "50%", left: "50%", margin: "-25px 0 0 -25px"}} alt="Loading Icon"/>
    //const antIcon = <Icon type="loading" style={{ fontSize: 30}} spin />;
    return (
        <Spin indicator={LoadingIcon}/>
    );
}