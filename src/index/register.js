import React, {Component} from 'react';
import "./register.css"
import { Radio,message} from 'antd';
import services from "../lib/services"

const RadioGroup = Radio.Group;
class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            password: "",
            name: "",
            gender: "",
            email: "",
            phone: "",
            checkPass: false

        }
    }

    handleSignUp = () => {
        if(!this.state.checkPass){
            message.error("请保持2次密码一致");
            return
        }
        if(this.state.username===""||this.state.name === ""||this.state.email===""||this.state.gender===""||this.state.phone===""||this.state.password===""){
            message.error("请输入完整用户信息！")
            return
        }
        const data = {
            name: this.state.name,
            username: this.state.username,
            mail:this.state.email,
            password: this.state.password,
            gender:this.state.gender,
            phone:this.state.phone
        };
        console.log(data)
        services.Questionnaire.SignUp(data).then(ret => {
            let data = ret.data
                message.info(data.message);

        }).catch(ret => {
            console.log(ret)
        })
    }
    setUserName = (e) => {
        this.setState({
                username: e.target.value
            }
        )
    }
    setName = (e) => {
        this.setState({
                name: e.target.value
            }
        )
    }
    setEmail = (e) => {
        this.setState({
                email: e.target.value
            }
        )
    }
    setPhone = (e) => {
        this.setState({
                phone: e.target.value
            }
        )
    }
    setGender = (e) => {
        this.setState({
                gender: e.target.value
            }
        )
    }
    setPassword = (e) => {
        this.setState({
                password: e.target.value
            }
        )
    }
    checkPassword = (e) => {
        let newPass = e.target.value
        if (newPass === this.state.password) {
            this.setState({
                    checkPass: true
                }
            )
        }
        else message.error("请保持2次密码一致");

    }

    render() {
        return (
            <div className="register"
                 style={{width: "100%", overflow: "hidden", position: "relative"}}>

                <div className="active signin" wj-hawkeye="rl_register_mobile">东篱网注册</div>
                <div className="form_list">
                        <input type="hidden" name="_xsrf"/>
                        <ul>
                            <li>
                                <label className="input_label">账户:</label>
                                <input type="text"  onChange={this.setUserName}/>
                            </li>
                            <li>
                                <label className="input_label">昵称:</label>
                                <input type="text" name="name" onChange={this.setName}/>
                            </li>
                            <li>
                                <label className="input_label">邮箱:</label>
                                <input type="text" name="email" onChange={this.setEmail}/>
                            </li>
                            <li>
                                <label className="input_label">电话:</label>
                                <input type="text" name="phone" onChange={this.setPhone}/>
                            </li>
                            <li>
                                <label className="input_label">性别:</label>
                                <RadioGroup onChange={this.setGender} defaultValue="男">
                                    <Radio value="男">男</Radio>
                                    <Radio value="女">女</Radio>
                                </RadioGroup>
                            </li>
                            <li>
                                <label className="input_label">密码:</label>
                                <input type="password" name="password" onChange={this.setPassword}/>
                            </li>
                            <li>
                                <label className="input_label">确认密码:</label>
                                <input type="password" onBlur={this.checkPassword}/>
                            </li>
                        </ul>
                        <button className="bt_css" onClick={this.handleSignUp} >
                            立即注册
                        </button>

                </div>
            </div>
        );
    };
}

export default Register;

