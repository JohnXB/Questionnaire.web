import React, {Component} from 'react';
import './header.css'
import services from "../lib/services"
import logo from '../images/logo.png'
import avater from '../images/image_3.jpg'
import {connect} from 'react-redux'
import {Modal, Button, Input, message} from 'antd';
import {Link} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            password: "",
            head: "../images/logo.png",
            visible: false,
            login: "none",
            not_login: "block"
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

    componentDidMount() {
        let token = document.cookie.split("=")[1];
        if (token !== undefined) {
            const data={
                token:token
            }
            services.Questionnaire.GetUser(data).then(ret => {
                if(ret.data.data.login){
                    this.setState({
                        username:ret.data.data.username,
                        password: "",
                        login: "block",
                        not_login: "none"
                    })
                }
                   else{
                    message.error("用户身份已过期，请重新登录")
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    document.cookie= "token" + "="+token+";expires="+exp.toGMTString();
                    this.props.history.push('/')
                }

            }).catch(ret => {
                console.log(ret)
            })

        }
    }

    handleLogin = (e) => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        services.Questionnaire.SignIn(data).then(ret => {
            let data = ret.data
            if (data.data.login === true) {
                message.success('登录成功');


                this.setState({
                    password: "",
                    login: "block",
                    not_login: "none"
                })
                this.handleCancel();
                this.props.addToken(data.data.currentToken)
                document.cookie = "token=" + data.data.currentToken;
            }
            else {
                message.error("用户名或密码错误");
            }




        }).catch(ret => {
            console.log(ret)
        })
    }
    handleLogout = () => {
        this.props.addToken("")
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let token = document.cookie.split("=")[1];
        if(token!=null)
            document.cookie= "token" + "="+token+";expires="+exp.toGMTString();
        this.setState({
            password: "",
            not_login: "block",
            login: "none"
        })
        this.props.history.push('/')
    }
    setUserName = (e) => {
        this.setState({
                username: e.target.value
            }
        )

    }
    setPassword = (e) => {
        this.setState({
                password: e.target.value
            }
        )

    }


    render() {
        return (
            <div id="header">
                <div className="wrapper">
                    <h1 className="logo">
                        <Link to="/">
                            <img alt="" src={logo}/>东篱
                        </Link>
                    </h1>
                    <div className="menu">
                        <ul>
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/questionnaires">发现问卷 </Link></li>
                            <li><Link to="/create" className="require_login">创建问卷</Link></li>
                            <li><Link to="/myQuestionnaires" className="require_login">我的问卷</Link></li>
                        </ul>
                    </div>
                    <div className="account">
                        <div id="login_checked" className="logged_in" style={{display: this.state.login}}>
                            <img alt="" className="avatar" src={avater}/>&nbsp;
                            <span className="name">{this.state.username}</span>
                            <span className="splitor">&nbsp;|&nbsp;</span>
                            <a id="logout" className="logout" onClick={this.handleLogout}>退出</a>
                        </div>
                        <div id="login_checking" className="not_logged_in" style={{display: this.state.not_login}}>
                            <a id="login" onClick={this.showModal} className="btn btn_green btn_small">登录</a>&nbsp;
                            <Link to='/register' className="btn btn_white btn_small">注册</Link>
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
                            <div style={{marginBottom: "20px"}}>
                                <span>用户名:</span> <Input placeholder="请输入用户名" onChange={this.setUserName}
                                                         className="username" style={{width: "80%"}}/>
                            </div>
                            <div>
                                <span>密&nbsp;&nbsp;&nbsp;&nbsp;码:</span> <Input placeholder="请输入密码"
                                                                                onChange={this.setPassword}
                                                                                type="password" className="password"
                                                                                style={{width: "80%"}}/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
    ;
}

function mapStateToProps(state) {

    return ({
        token: state.user.token
    })
}

function mapDispatchToProps(dispatch) {
    return {
        addToken: (token) => {
            dispatch({
                type: 'ADD_TOKEN',
                token: token

            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

