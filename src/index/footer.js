import React, {Component} from 'react';
import './footer.css'
import qr_code from '../images/wx_public_qr_code.png'

class Footer extends Component {
    render() {
        return (
            <div>
                <div id="footer" className="g_footer">
                    <div className="wrapper">
                        <div className="description">
                            <p className="key_words">
                                <span className="key_word simple">简约</span>
                                <span className="key_word easy">好用</span>
                                <span className="key_word free">免费</span>
                            </p>
                            <p className="slogan">东篱网为您提供专业调研服务</p>
                        </div>
                        <div className="contact_us">
                            <p className="bold">任何建议和问题随时<a target="_blank"
                                                            href="https://support.qq.com/products/1221">吐个槽</a></p>
                            <p className="contacts">
                                官方邮箱：<a target="_blank" href="mailto:wj@tencent.com">408106378@qq.com</a>
                                <br/>官方QQ：<a target="_blank" alt="腾讯问卷反馈群" title="腾讯问卷反馈群">408106378</a>

                            </p>
                        </div>
                        <div className="wx_qrcode">
                            <img src={qr_code}/>
                            <p className="bold">扫描关注微信公众号</p>
                        </div>
                    </div>
                </div>
                <div id="footer" className="q_footer">
                    <p>Copyright © 2015-<span className="copyright_end">2018</span> Singularity. All Rights Reserved.</p>
                    <p>
                        <span>软工肖波 版权所有</span>&nbsp;
                        <a  className="link" target="_blank" title="关于我们">关于我们</a>&nbsp;
                        <a  className="link" target="_blank" title="关于我们">免责声明</a>&nbsp;
                        <a target="_blank" >问题反馈</a>&nbsp;
                        <a  target="_blank" title="腾讯网">腾讯网</a>&nbsp;
                        <a  className="link" target="_blank" title="服务协议">服务协议</a>&nbsp;
                        <a  className="link" target="_blank" title="隐私政策">隐私政策</a>
                    </p>
                </div>
            </div>
        );
    };
}

export default Footer;