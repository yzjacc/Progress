import React, {Component} from 'react';
import {connect} from "react-redux";
import {getStudentDataAction} from "../../Store/actionCreators";

class User extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <div className="body">
                    <ol className="breadcrumb">
                        <li><a href="javascript:;">用户管理</a></li>
                        <li className="active">用户列表</li>
                    </ol>
                    <div className="panel panel-default user-list">
                        <div className="panel-body">
                            <form action="" className="form-inline">
                                <select name="" className="form-control input-sm">
                                    <option value="">按年龄</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按性别</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按地区</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按日期</option>
                                </select>
                                <button className="btn btn-danger btn-sm">筛选</button>
                                <div className="input-group pull-right">
                                    <input type="text" className="form-control input-sm" />
                                <span className="input-group-btn">
                                    <button className="btn btn-danger btn-sm">搜索</button>
                                </span>
                                </div>
                            </form>
                        </div>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>编号</th>
                                <th>注册账号</th>
                                <th>昵称</th>
                                <th>年龄</th>
                                <th>性别</th>
                                <th>地区</th>
                                <th>手机号码</th>
                                <th>积分</th>
                                <th>注册时间</th>
                                <th>登录时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.studentData.map((student, index)=>(
                                    <tr key={index}>
                                        <td>{'LK'+(index+1)}</td>
                                        <td>{student.reg_account}</td>
                                        <td>{student.user_name}</td>
                                        <td>{student.user_age}</td>
                                        <td>{student.user_sex}</td>
                                        <td>{student.area}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.points}</td>
                                        <td>{student.reg_time}</td>
                                        <td>{student.last_login_time}</td>
                                        <td>
                                            <a href="user_center.html" className="btn btn-info btn-xs">查看</a>
                                            <a href="javascript:;" className="btn btn-warning btn-xs">锁定</a>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <ul className="pagination pull-right">
                        <li><a href="#">上一页</a></li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">下一页</a></li>
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.reqStudentList();
    }
}

const mapStateToProps = (state)=>{
    return {
       studentData: state.studentData
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
       reqStudentList(){
           const action = getStudentDataAction();
           dispatch(action)
       }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);