import React, {Component} from 'react';
import services from "../lib/services"
import {connect} from 'react-redux'
import "./show.css"
import {Radio, Checkbox, Button, message} from 'antd';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Questionnaire extends Component {
    constructor(props) {
        super()
        this.state = {
            questionnaire: [],
            record: []
        }


    }

    componentDidMount() {
        services.Questionnaire.GetQuestionnaireById(this.props.id).then(ret => {
            this.setState({
                questionnaire: ret.data.data
            })
            var record = []
            this.state.questionnaire.questions.map((item, i) => {
                record.push({questionnaire_id: ret.data.data.id, question_id: item.id, options: []})
            })
            this.setState({
                record: record
            })
        }).catch(ret => {
            console.log(ret)
        })

    };

    changeOption = (i, e) => {
        var option = []
        option.push(e.target.value)
        this.state.record[i].options = option
    }
    changeOptions = (i, e) => {
        this.state.record[i].options = e
    }
    submitQues = () => {
        if (document.cookie.split("=")[1] === undefined) {
            message.error("请先完成登录")
            return
        }
        const array = []
        this.state.record.map((item, i) => {
            if (item.options.length === 0) {
                message.error("请填写所有问题")
                return
            }
        })

        let token = document.cookie.split("=")[1];
        const data = {
            token: token
        }

        services.Questionnaire.GetUser(data).then(ret => {
            if (ret.data.data.login) {
                const recordData = {
                    token: document.cookie.split("=")[1],
                    record: this.state.record
                }
                services.Questionnaire.FillIn(recordData).then(result => {
                    message.info(result.data.message)
                    this.props.history.push('/questionnaires')
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

    render() {
        return (
            <div className="show_content">
                <h1 className="title">{this.state.questionnaire.title}  </h1>
                <h3 id="subtitle">——————作者：{this.state.questionnaire.creatorName}    </h3>
                <h3 className="description">简介：{this.state.questionnaire.description}    </h3>
                <div className="layui-elem-quote">
                    <p style={{textAlign: "center"}}>请尽量如实填写，保证问卷的真实性，如有疑问，请咨询作者！</p>
                </div>
                <hr/>
                {
                    this.state.questionnaire.questions === undefined ? <div></div> :
                        this.state.questionnaire.questions.map((item, i) => {
                            return (
                                <div key={i} className="layui-form-item">
                                    <div className="questionName">{i + 1},{item.description}</div>
                                    <div className="layui-input-block iInput">
                                        {item.type === 1 ?
                                            <RadioGroup onChange={this.changeOption.bind(this, i)}>
                                                {
                                                    item.options.map((ite, index) => {
                                                        return (<Radio key={index} value={ite.id}
                                                                       style={{marginLeft: "20px"}}>{item.description}</Radio>)
                                                    })
                                                }
                                            </RadioGroup> :
                                            <Checkbox.Group onChange={this.changeOptions.bind(this, i)}>
                                                {
                                                    item.options.map((ite, index) => {
                                                        return (<Checkbox key={index} value={ite.id}
                                                                          style={{marginLeft: "20px"}}>{item.description}</Checkbox>)
                                                    })
                                                }
                                            </Checkbox.Group>
                                        }
                                    </div>
                                </div>

                            )
                        })
                }
                <Button type="primary" size="large"
                        style={{display: "block", marginTop: "30px", margin: "auto"}}
                        onClick={this.submitQues.bind(this)}>立即提交</Button>
            </div>
        );
    };
}

function mapStateToProps(state) {

    return ({
        id: state.questionnaire.id
    })
}


export default connect(mapStateToProps)(Questionnaire);