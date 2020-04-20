import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserDataAction} from '../../Store/actionCreators'
import md5 from 'md5'

const S_KEY = 'WaYjH1314.ItLikE.CoM';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_name: '',
            user_pwd: ''
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-wrap">
                    <div className="avatar">
                        <img src="./uploads/logo.jpg" className="img-circle" alt="" />
                    </div>
                    <div className="col-md-offset-1 col-md-10">
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-id-card-o"></i>
                            </span>
                            <input
                                name="user_name"
                                type="text"
                                className="form-control"
                                placeholder="撩课口令"
                                onChange={e=>this._onInputChange(e)}
                                onKeyUp={e=>this._onInputKeyUp(e)}
                            />
                        </div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-key"></i>
                            </span>
                            <input
                                name="user_pwd"
                                type="password"
                                className="form-control"
                                placeholder="密码"
                                onChange={e=>this._onInputChange(e)}
                                onKeyUp={e=>this._onInputKeyUp(e)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-danger btn-block"
                            onClick={e=>this._onSubmit(e)}
                        >
                            登 录
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 1. 当输入框的内容发生改变
    _onInputChange(e){
       // 1.1 获取数据
       let inputValue = e.target.value,
           inputName = e.target.name;
       // console.log(inputName, inputValue);

       // 1.2 更新数据
       this.setState({
           [inputName] : inputValue
       })

    }

    // 2. 处理回车
    _onInputKeyUp(e){
         if(e.keyCode === 13){
             this._onSubmit();
         }
    }

    // 3. 当用户提交表单
    _onSubmit(){
         // 3.1 获取数据
        const {user_name, user_pwd} = this.state;
        // 3.2 验证数据
        if(!user_name){
            alert("输入的口令不能为空！");
            return;
        }
        if(!user_pwd){
            alert("输入的密码不能为空！");
            return;
        }

        // 3.3 密码的加密
        const md5_user_pwd = md5(user_pwd + S_KEY);
        console.log(md5_user_pwd);

        let params = new URLSearchParams();
        params.append('user_name', user_name);
        params.append('user_pwd', md5_user_pwd);

        // 3.4 发起网络请求
        this.props.reqLogin(params, (userData)=>{
            if(userData.token !== ''){
                this.props.history.push('/');
            }
        })
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        reqLogin(data, callback){
            const action = getUserDataAction(data, callback);
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(Login);