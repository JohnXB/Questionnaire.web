import React, {Component} from 'react';
import services from "../lib/services"
import {message, Input, Radio, Button} from "antd"
import "./myQues.css"


class MyQues extends Component {
    componentWillMount() {
        if (document.cookie.split("=")[1] === undefined) {
            message.error("请先完成登录")
            this.props.history.push('/')
        }

    }
    constructor(props) {
        super()
        this.state = {
            title: ""
        }
    }

    render() {
        return (
            <div className="show_content">


            </div>
        );
    };
}

export default MyQues;