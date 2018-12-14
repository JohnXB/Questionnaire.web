import React, {Component} from 'react';
import services from "../lib/services"
import {message, Button, Icon, Switch} from "antd"
import moment from 'moment'
import "./myQues.css"
import {Link} from "react-router-dom";

class MyQues extends Component {
    constructor(props) {
        super()
        this.state = {
            questionnaire: []
        }
    }

    componentWillMount() {
        let token = document.cookie.split("=")[1]
        if (token === undefined) {
            message.error("请先完成登录")
            this.props.history.push('/')
            return
        }
        const data = {
            token: token
        }
        this.checkUser(data)
    }

    checkUser = (data) => {
        let token = document.cookie.split("=")[1]
        services.Questionnaire.GetUser(data).then(ret => {
            if (ret.data.data.login) {
                services.Questionnaire.GetUserQues(data).then(result => {
                    this.setState({
                        questionnaire: result.data.data
                    })
                })
            }
            else {
                message.error("用户身份已过期，请重新登录")
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                document.cookie = "token" + "=" + token + ";expires=" + exp.toGMTString();
                this.props.history.push('/')
            }
        })
    }
    changeVisible = (id, e) => {
        let token = document.cookie.split("=")[1]
        const data = {token: token}
        const changeData = {
            token: token,
            id: id
        }
        if (!e) {
            services.Questionnaire.visibleClose(changeData).then(ret => {
                message.info(ret.data.message)
            })
        }
        else {
            services.Questionnaire.visibleOpen(changeData).then(ret => {
                message.info(ret.data.message)
            })
        }
        this.checkUser(data)
    }
    deleteQues = (id, e) => {
        let token = document.cookie.split("=")[1]

        const data = {
            token: token
        }
        const deleteData = {
            token: token,
            id: id
        }
        services.Questionnaire.DeleteQues(deleteData).then(ret => {
            message.info(ret.data.message)
        })
        this.checkUser(data)

    }

    render() {
        return (
            <div className="my_content">
                <div className="g_content">
                    <Link id="create_survey" className="btn btn_middle btn_blue" to="/create">
                        <Icon type="plus"/>创建问卷
                    </Link>
                </div>
                <div className="list_table_head">
                    <div className="title">问卷</div>
                    <div className="status_col">状态</div>
                    <div className="more_operations">操作</div>
                    <div className="recycle">问题量</div>
                    <div className="create_time current">创建时间</div>
                </div>
                <div id="survey_list" className="survey_list">
                    {
                        this.state.questionnaire.map((item, i) => {
                            return (
                                <div key={i} className="survey_item">
                                    <div className="title">
                                        {item.title}
                                    </div>
                                    <div className="status_col"> {item.visible ?
                                        <Switch defaultChecked onChange={this.changeVisible.bind(this, item.id)}/> :
                                        <Switch/>}  </div>
                                    <div className="more_operations">
                                        <Button type="danger" onClick={this.deleteQues.bind(this, item.id)}>删除</Button>
                                    </div>
                                    <div className="recycle">{item.questionCount}</div>
                                    <div className="create_time current">
                                        {
                                            moment(item.createAt).format('YYYY-MM-DD HH:mm:ss')
                                        }
                                        </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        );
    };
}

export default MyQues;