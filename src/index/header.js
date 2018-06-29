import React, {Component} from 'react';
import './header.css'
import services from "../lib/services"
import logo from '../images/logo.png'
import avater from '../images/index_sliders_bg.jpg'
import {Modal, Button, Input,message} from 'antd';

class Header extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            password: "",
            head: "../images/logo.png",
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleLogin = (e) => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        services.Questionnaire.SignIn(data).then(ret => {

            if(ret.data.data.login === true){
                message.info('登录成功');
                this.setState({
                    password : ""
                })
                this.handleCancel()
            }
           else message.error("用户名或密码错误");


        }).catch(ret => {
            console.log(ret.data)
        })
    }
    setUserName = (e) => {
        this.setState({
                username : e.target.value
            }
        )

    }
    setPassword = (e) => {
        this.setState({
                password : e.target.value
            }
        )

    }
    render() {
        return (
            <div id="header">
                <div className="wrapper">
                    <h1 className="logo">
                        <a href="">
                            <img src={logo}/>东篱
                        </a>
                    </h1>
                    <div className="menu">
                        <ul>
                            <li><a href="">首页</a></li>
                            <li><a href="">发现问卷 </a></li>
                            <li><a href="" className="require_login">创建问卷</a></li>
                            <li><a href="" className="require_login">我的问卷</a></li>
                        </ul>
                    </div>
                    <div className="account">
                        <div id="login_checked" className="logged_in">
                            <img className="avatar" src={avater} />&nbsp;
                            <span className="name">{this.state.username}</span>
                            <span className="splitor">&nbsp;|&nbsp;</span>
                            <a href="javascript:;" id="logout" className="logout">退出</a>
                        </div>
                        <div id="login_checking" className="not_logged_in" style={{display: "block"}}>
                            <a id="login" onClick={this.showModal} className="btn btn_green btn_small">登录</a>&nbsp;
                            <a id="login" href="" className="btn btn_white btn_small">注册</a>
                        </div>
                        <Modal
                            title="登录"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" onClick={this.handleLogin}>
                                    登录
                                </Button>,
                            ]}
                        >
                            <div style={{marginBottom:"20px"}}>
                                <span>用户名:</span>  <Input placeholder="请输入用户名"onChange={this.setUserName} className="username"style={{width:"80%"}}/>
                            </div>
                            <div>
                                <span >密&nbsp;&nbsp;&nbsp;&nbsp;码:</span> <Input placeholder="请输入密码" onChange={this.setPassword} type="password" className="password" style={{width:"80%"}}/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    };
}

export default Header;