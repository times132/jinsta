import React from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from "../../constants";

import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

class Login extends React.Component{
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err){
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                        if (error.status === 401){
                            notification.error({
                                message: "Jinstagram",
                                description: "Your Username or Password is incorrect. Please try again."
                            });
                        } else{
                            notification.error({
                                message: "Jinstagram",
                                description: error.message || "Sorry. Something went wrong. Please try again"
                            });
                        }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <article className="login-acticle">
                <div className="rgFsT">
                    <div className="gr27e">
                        <h1 className="NXVPg Szr5J coreSpriteLoggedOutWordmark">Jinstagram</h1>
                        <div className="EPjEi">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <div className="empty-block"></div>
                                <div className="-MzZI">
                                    <FormItem>
                                        { getFieldDecorator('usernameOrEmail', {
                                            rules: [{required: true, message: "Please input your username or email."}],
                                        })(
                                            <Input
                                                prefix={<Icon type="user"/>}
                                                name="usernameOrEmail"
                                                placeholder="사용자이름 또는 이메일"/>
                                        )}
                                    </FormItem>
                                </div>
                                <div className="-MzZI">
                                    <FormItem>
                                        { getFieldDecorator('password', {
                                            rules: [{required: true, message: "Please input your password."}],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" />}
                                                name="password"
                                                type="password"
                                                placeholder="비밀번호"/>
                                        )}
                                    </FormItem>
                                </div>
                                <div className="-MzZI">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                                    </FormItem>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="gr27e">
                        <p className="izU2O">계정이 없으신가요? <Link to="/signup">가입하기</Link></p>
                    </div>
                </div>
            </article>


        );
    }
}

export default Login;