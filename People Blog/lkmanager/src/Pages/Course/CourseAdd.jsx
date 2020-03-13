import React, {Component} from 'react';

class CourseAdd extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="body course-add">
                    <ol className="breadcrumb">
                        <li><a href="javascript:;">课程管理</a></li>
                        <li className="active">课程添加</li>
                    </ol>
                    <div className="steps create">
                        <div className="title">
                            <h5>创建课程 <small>CREATE A COURSE</small></h5>
                        </div>
                        <form action="" className="form-horizontal  col-md-offset-3 col-md-6">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">课程名称</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control input-sm" placeholder="请填写课程名称" />
                                        <small className="text-danger">注意: 课程名称即对外展示的信息</small>
                                </div>
                            </div>
                            <div className="col-md-11">
                                <a href="course_add_one.html" className="btn btn-danger btn-sm pull-right">创建课程</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseAdd;