import React, {Component} from 'react';
import icon from './../../Common/images/default.png'

class Mine extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="body teacher-profile">
                    <div className="settings">
                        <form action="" className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">姓名</label>
                                <div className="col-md-5">
                                    <p className="form-control-static">旋之华</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">头像</label>
                                <div className="col-md-2 preview">
                                    <img src={icon} style={{border: 1}} />
                                        <input type="file" id="upfile" />
                                            <div className="cover">
                                                <i className="fa fa-upload"></i>
                                            </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">性别</label>
                                <div className="col-md-3">
                                    <label className="radio-inline">
                                        <input type="radio" checked/> 男
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio"/> 女
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">用户名</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">手机号码</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">Email</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">加入日期</label>
                                <div className="col-md-5">
                                    <input type="date" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">出生日期</label>
                                <div className="col-md-5">
                                    <input type="date" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">住址</label>
                                <div className="col-md-5">
                                    <select name="" className="form-control input-sm">
                                        <option value="">安徽省</option>
                                        <option value="">江苏省</option>
                                        <option value="">广东省</option>
                                    </select>
                                    <select name="" className="form-control input-sm">
                                        <option value="">黄山市</option>
                                        <option value="">上海市</option>
                                        <option value="">广州市</option>
                                    </select>
                                    <select name="" className="form-control input-sm">
                                        <option value="">徽州区</option>
                                        <option value="">徐汇区</option>
                                        <option value="">天河区</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">自我介绍</label>
                                <div className="col-md-5 ckeditor">
                                    <textarea name="" rows="15" className="form-control input-sm"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-8">
                                    <a href="course_add_two.html" className="btn btn-danger pull-right">保 存</a>
                                    <a href="reset_pwd.html" className="btn btn-link btn-success pull-right">修改密码？</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mine;