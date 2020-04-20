import React, {Component} from 'react';
import course_1 from './../../Common/uploads/course_1.png'
import course_2 from './../../Common/uploads/course_2.png'
import course_3 from './../../Common/uploads/course_3.png'
import course_4 from './../../Common/uploads/course_4.png'

class CourseList extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="body course-list">
                    <ol className="breadcrumb">
                        <li><a href="javascript:;">课程管理</a></li>
                        <li className="active">课程列表</li>
                    </ol>
                    <div className="courses">
                        <div className="search">
                            <form action="" className="form-inline">
                                <select name="" className="form-control input-sm">
                                    <option value="">按学科</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按类型</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按价格</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按热度</option>
                                </select>
                                <button className="btn btn-danger btn-sm">过滤</button>
                                <div className="input-group pull-right">
                                    <input type="text" className="form-control input-sm" />
                                <span className="input-group-btn">
                                    <button className="btn btn-danger btn-sm">搜索</button>
                                </span>
                                </div>
                            </form>
                        </div>
                        <div className="course">
                            <div className="pic">
                                <img src={course_1} alt=""/>
                            </div>
                            <div className="info">
                                <a href="javascript:;">撩课大前端—Vue项目实战—撩多多商城</a>
                                <ul className="list-unstyled">
                                    <li>
                                        <span>讲师：叶建华</span>
                                        <span>类别：web大前端</span>
                                    </li>
                                    <li>
                                        <span>课时：123</span>
                                        <span>学员：111111</span>
                                    </li>
                                    <li>
                                        <span>浏览：123333</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="course">
                            <div className="pic">
                                <img src={course_2} alt=""/>
                            </div>
                            <div className="info">
                                <a href="javascript:;">撩课大前端—Vue项目实战—撩多多商城</a>
                                <ul className="list-unstyled">
                                    <li>
                                        <span>讲师：叶建华</span>
                                        <span>类别：web大前端</span>
                                    </li>
                                    <li>
                                        <span>课时：123</span>
                                        <span>学员：111111</span>
                                    </li>
                                    <li>
                                        <span>浏览：123333</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="course">
                            <div className="pic">
                                <img src={course_3} alt=""/>
                            </div>
                            <div className="info">
                                <a href="javascript:;">撩课大前端—Vue项目实战—撩多多商城</a>
                                <ul className="list-unstyled">
                                    <li>
                                        <span>讲师：叶建华</span>
                                        <span>类别：web大前端</span>
                                    </li>
                                    <li>
                                        <span>课时：123</span>
                                        <span>学员：111111</span>
                                    </li>
                                    <li>
                                        <span>浏览：123333</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="course">
                            <div className="pic">
                                <img src={course_4} alt=""/>
                            </div>
                            <div className="info">
                                <a href="javascript:;">撩课大前端—Vue项目实战—撩多多商城</a>
                                <ul className="list-unstyled">
                                    <li>
                                        <span>讲师：叶建华</span>
                                        <span>类别：web大前端</span>
                                    </li>
                                    <li>
                                        <span>课时：123</span>
                                        <span>学员：111111</span>
                                    </li>
                                    <li>
                                        <span>浏览：123333</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="course">
                            <div className="pic">
                                <img src={course_1} alt="" />
                            </div>
                            <div className="info">
                                <a href="javascript:;">撩课大前端—Vue项目实战—撩多多商城</a>
                                <ul className="list-unstyled">
                                    <li>
                                        <span>讲师：叶建华</span>
                                        <span>类别：web大前端</span>
                                    </li>
                                    <li>
                                        <span>课时：123</span>
                                        <span>学员：111111</span>
                                    </li>
                                    <li>
                                        <span>浏览：123333</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
}

export default CourseList;