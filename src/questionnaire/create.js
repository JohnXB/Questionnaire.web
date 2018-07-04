import React, {Component} from 'react';
import services from "../lib/services"
import {message, Input, Radio, Button} from "antd"
import "./create.css"

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Create extends Component {


    constructor(props) {
        super()
        this.state = {
            classification: [],
            classification_id: "",
            description: "问卷描述",
            title: "问卷标题",
            questions: [{description: "请输入问题", type: 1, options: [{description: "请输入选项"}, {description: "请输入选项"}]}]
        }


    }

    componentWillMount() {
        if (document.cookie.split("=")[1] === undefined) {
            message.error("请先完成登录")
            this.props.history.push('/')
        }
        services.Questionnaire.GetClassfications().then(ret => {
            ret.data.data.push({id: "", name: "未分类"})
            this.setState({
                classification: ret.data.data
            })
        }).catch(ret => {
            console.log(ret)
        })
    }

    deleteOption = (i) => {
        if (this.state.questions[i].options.length === 2) {
            message.error("至少2个选项")
            return
        }
        else {
            this.state.questions[i].options.pop()
            var nowQuestions = this.state.questions
            this.setState({
                questions: nowQuestions
            })

        }

    }
    addOption = (i) => {
        this.state.questions[i].options.push({description: "请输入选项"})
        var nowQuestions = this.state.questions
        this.setState({
            questions: nowQuestions
        })
    }
    addQuestion = () => {
        this.state.questions.push({
            description: "请输入问题",
            type: 1,
            options: [{description: "请输入选项"}, {description: "请输入选项"}]
        })
        var nowQuestions = this.state.questions
        this.setState({
            questions: nowQuestions
        })
    }
    deleteQuestion = () => {
        if (this.state.questions.length === 1) {
            message.error("至少1个问题")
            return
        }
        else {
            this.state.questions.pop()
            var nowQuestions = this.state.questions
            this.setState({
                questions: nowQuestions
            })

        }
    }
    changeClassiId = (e) => {
        this.setState({
                classification_id: e.target.value
            }
        )

    }
    changeTitle = (e) => {
        this.setState({
                title: e.target.value
            }
        )
    }
    changeDescription = (e) => {
        this.setState({
                description: e.target.value
            }
        )
    }
    //修改问题类型
    changeType = (i, e) => {
        this.state.questions[i].type = e.target.value
        this.setState({
            questions: this.state.questions
        })
    }
    changeQuestion = (i, e) => {
        this.state.questions[i].description = e.target.value
        this.setState({
                questions: this.state.questions
            }
        )
    }
    changeOption = (i, key, e) => {
        this.state.questions[i].options[key].description = e.target.value
        this.setState({
                questions: this.state.questions
            }
        )
    }
    createQuestionnaire = (e) => {
        const data = {
            classificationId: this.state.classification_id,
            description: this.state.description,
            title: this.state.title,
            questions: this.state.questions,
            token: document.cookie.split("=")[1]
        }
        services.Questionnaire.Create(data).then(ret => {
              message.info(ret.data.message)
        }).catch(ret => {
            console.log(ret)
        })
    }

    render() {
        return (
            <div className="show_content">
                <div className="layui-elem-quote" style={{marginTop: "20px"}}>
                    <p>创建一个新的问卷，注：本网站目前只支持单选题与多选题，不支持填空等问答题</p>
                </div>

                <div className="layui-form-item">
                    <label className="layui-form-label iLabel" style={{fontSize: "20px"}}>标题：</label>
                    <div className="layui-input-block">
                        <Input size="large" placeholder="large size" onChange={this.changeTitle.bind(this)}
                               defaultValue={"问卷标题"}/>
                    </div>
                </div>
                <div className="layui-form-item">
                    <label className="layui-form-label iLabel" style={{fontSize: "16px"}}>分类：</label>
                    <RadioGroup defaultValue={this.state.classification_id} onChange={this.changeClassiId.bind(this)}
                                style={{paddingLeft: "10px"}}>
                        {
                            this.state.classification.map((item, i) => {
                                return (
                                    <RadioButton key={i} value={item.id}>{item.name}</RadioButton>
                                )
                            })
                        }

                    </RadioGroup>
                </div>
                <div className="layui-form-item">
                    <label className="layui-form-label iLabel" style={{fontSize: "16px"}}>问卷描述：</label>
                    <div className="layui-input-block">
                        <Input size="large" placeholder="large size" onChange={this.changeDescription.bind(this)}
                               defaultValue={"问卷描述"}/>
                    </div>
                    <legend>添加问题</legend>
                </div>
                <div className="question">
                    {
                        this.state.questions.map((item, i) => {
                            return (
                                <div className="ques" key={i}>
                                    <div className="layui-form-item iQuestion">
                                        <label className="quesNum">问题{i + 1}：</label>
                                        <div className="quesInput">
                                            <Input size="large" placeholder="large size"
                                                   onChange={this.changeQuestion.bind(this, i)} defaultValue={"请输入问题"}/>
                                        </div>
                                    </div>
                                    <div className="layui-form-item iQuestion">
                                        <label className="quesNum" style={{marginLeft: "15px"}}>类型：</label>
                                        <div className="quesInput">
                                            <RadioGroup name={item.id} defaultValue={item.type}
                                                        onChange={this.changeType.bind(this, i)}>
                                                <Radio value={1} style={{marginLeft: "20px"}}>单选题</Radio>
                                                <Radio value={2} style={{marginLeft: "20px"}}>多选题</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <div className="layui-form-item iAnswer">
                                        {
                                            item.options.map((ite, key) => {
                                                return (
                                                    <div className="option" key={key}>
                                                        <label className="optionNum">选项{key + 1}：</label>
                                                        <div className="optionInput">
                                                            <Input size="large" placeholder="large size"
                                                                   onChange={this.changeOption.bind(this, i, key)}
                                                                   defaultValue={"请输入选项"}/>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                    </div>
                                    <Button type="primary" icon="plus-circle-o" style={{marginRight: "20px"}}
                                            onClick={() => this.addOption(i, item.options.length)}>添加</Button>
                                    <Button type="primary" icon="delete"
                                            onClick={() => this.deleteOption(i)}>删除</Button>
                                </div>
                            )
                        })
                    }
                </div>
                <Button type="primary" icon="plus-circle-o" style={{marginRight: "20px"}}
                        onClick={() => this.addQuestion()}>添加</Button>
                <Button type="primary" icon="delete"
                        onClick={() => this.deleteQuestion()}>删除</Button>
                <Button type="primary" size="large"
                        style={{display: "block", marginTop: "30px", margin: "auto"}}
                        onClick={this.createQuestionnaire.bind(this)}>立即提交</Button>
            </div>
        );
    };
}

export default Create;