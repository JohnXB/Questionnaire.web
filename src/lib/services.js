import config from "./config";
import {notification} from "antd";
import axios from "axios";

export default class Service {
    // 基服务
    static get businessService() {
        //创建axios的对象
        let service = axios.create({
            baseURL: `${config.service.url}`,
            headers: {'App-Version': '0.1.0'}
        });

        service.defaults.timeout = 12000;
        //此处为一个全局的响应拦截器，关于拦截器的用法请查阅axios的文档
        service.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.code === 'ECONNABORTED' || !error.response) {
                notification.warning({
                    key: 'network error',
                    message: '很抱歉',
                    description: '请检查您的网络是否正常..'
                });
            }


            return Promise.reject(error);
        });

        return service;
    }

    static Questionnaire = class {
        //... spread操作符,这种写法为es6的语法,查阅相关文档（其实简单来说就是传递不定个数的参数）
        static SignIn = ( data,params = {}) => Service.businessService.post("/User/SignIn",data,params);
        static GetUser = ( data,params = {}) => Service.businessService.post("/User/GetUser",data,params);
        static SignUp = ( data,params = {}) => Service.businessService.post("/User/SignUp", data, params);
        static GetClassfications = (data, options = {}) => Service.businessService.get("/Classification/A01");
        static GetQuestionnaire = (data, options = {}) => Service.businessService.get(`/Questionnaire/A01?id=${data}`);
        static GetQuestionnaireById = (data, options = {}) => Service.businessService.get(`/Questionnaire/A03?id=${data}`);
        static Create = ( data,params = {}) => Service.businessService.post("/Questionnaire/A02", data, params);
        static Delete = (id, params, options = {}) => Service.businessService.delete(`/articles/${id}`, {
            ...options,
            params: params
        });
        static Get = (id, params, options = {}) => Service.businessService.get(`/articles/${id}`, {
            ...options,
            params: params
        });
    };

    static Categories = class {
        static List = (params, options = {}) => Service.businessService.get("/categories", {
            ...options,
            params: params
        });
    }
}