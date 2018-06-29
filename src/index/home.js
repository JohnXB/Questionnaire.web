import React, {Component} from 'react';
import backgroundImg from '../images/ads_slider_p1.png'
import "./home.css"
class Home extends Component {
    render() {
        return (
            <div className="bx-viewport"  style={{width:"100%", overflow: "hidden", position: "relative", height: "510px"}}>

                    <h2>免费简约的问卷系统</h2>
                    <h3>所有功能全部免费，简约好用，轻松开启在线调试</h3>
                    <img src={backgroundImg} alt="免费简约的问卷系统"/>

                </div>
        );
    };
}

export default Home;