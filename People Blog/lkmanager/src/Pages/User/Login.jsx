import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-wrap">
                    <div className="avatar">
                        <img src="./uploads/logo.jpg" className="img-circle" alt="" />
                    </div>
                    <form action="" className="col-md-offset-1 col-md-10">
                        <div className="input-group input-group-lg">
                    <span className="input-group-addon">
                        <i className="fa fa-id-card-o"></i>
                    </span>
                            <input type="text" className="form-control" placeholder="撩课口令" />
                        </div>
                        <div className="input-group input-group-lg">
                    <span className="input-group-addon">
                        <i className="fa fa-key"></i>
                    </span>
                            <input type="password" className="form-control" placeholder="密码" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-danger btn-block">登 录</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;