import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyHeader from './index/header';
import MyFooter from './index/footer.js';
import Home from './index/home.js';
import Register from './index/register.js';
import QuestionnaireList from './questionnaire/questionnaires.js';
import Questionnaire from './questionnaire/show.js';
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from "react-router";
import Create from "./questionnaire/create"
import MyQues from "./questionnaire/myQues.js"
import registerServiceWorker from './registerServiceWorker';

// 引入redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
// 引入reducer
import reducer from './lib/reducer'

// 创建一个初始化的state
var initState = {
    user: {
        token: ''
    },
    questionnaire: {
        id: ''
    }
}

// 创建store
const store = createStore(reducer, initState)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/' render={(props) => (
                    <div>
                        <MyHeader {...props}/>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/register' component={Register}/>
                            <Route exact path='/questionnaires' component={QuestionnaireList}/>
                            <Route path='/questionnaires/show' render={() => <Questionnaire {...props} />}/>
                            <Route path='/create' render={() => <Create {...props} />}/>
                            <Route path='/myQuestionnaires' render={() => <MyQues {...props} />}/>
                        </Switch>
                        <MyFooter/>
                    </div>
                )}></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
