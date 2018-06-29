import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyHeader from './index/header.js';
import MyFooter from './index/footer.js';
import Home from './index/home.js';
import { BrowserRouter } from 'react-router-dom'
import {Route, Switch} from "react-router";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <MyHeader/>
            <Switch>
                <Route path='/' component={Home}/>
            </Switch>
            <MyFooter/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
