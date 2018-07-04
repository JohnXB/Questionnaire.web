import React, {Component} from 'react';
import services from "../lib/services"
import {connect} from 'react-redux'
import "./show.css"
import {Radio, Checkbox} from 'antd';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Questionnaire extends Component {
    constructor(props) {
        super()
        this.state = {
            questionnaire: []
        }


    }

    componentDidMount() {
        services.Questionnaire.GetQuestionnaireById(this.props.id).then(ret => {
            this.setState({
                questionnaire: ret.data.data
            })
            console.log(ret.data.data)
        }).catch(ret => {
            console.log(ret)
        })

    };


    render() {
        return (
            <div className="show_content">
                <h1 className="title">{this.state.questionnaire.title}  </h1>
                <h3 id="subtitle">——————作者：{this.state.questionnaire.creatorName}    </h3>
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
                                                <RadioGroup name={item.id}>
                                                    {
                                                        item.options.map((ite, i) => {
                                                            return (<Radio key={i} value={ite.id}
                                                                           style={{marginLeft: "20px"}}>{item.description}</Radio>)
                                                        })
                                                    }
                                                </RadioGroup> :
                                            <Checkbox.Group name={item.id}>
                                                {
                                                    item.options.map((ite, i) => {
                                                        return (<Checkbox key={i} value={ite.id}
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