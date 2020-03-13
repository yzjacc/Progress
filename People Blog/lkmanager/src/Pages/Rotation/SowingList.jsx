import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getSowingDataAction} from './../../Store/actionCreators'
import {removeSowingData} from './../../Api/index'
import { Link } from "react-router-dom";

const IMG_PRE = 'http://localhost:1688/uploads/';

class SowingList extends Component {
    render() {
        const {sowingData} = this.props;
        return (
            <div className="container-fluid">
                <div className="body advert">
                    <ol className="breadcrumb">
                        <li><a href="javascript:;">轮播图管理</a></li>
                        <li className="active">轮播图列表</li>
                    </ol>
                    <div className="page-title">
                        <a href="/sowingadd" className="btn btn-danger btn-sm pull-right">添加轮播图</a>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form action="" className="form-inline">
                                <select name="" className="form-control input-sm">
                                    <option value="">按课程</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按学科</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按热度</option>
                                </select>
                                <select name="" className="form-control input-sm">
                                    <option value="">按日期</option>
                                </select>
                                <button className="btn btn-primary btn-sm">排序</button>
                            </form>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <td>序号</td>
                                <th>图片名称</th>
                                <th>大图</th>
                                <th>小图</th>
                                <th>跳转链接</th>
                                <th>上架时间</th>
                                <th>下架时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                sowingData.map((sowing, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>LK00{index + 1}</td>
                                            <td>{sowing.image_title}</td>
                                            <td><img src={IMG_PRE + sowing.image_url} style={{width: 150}} /></td>
                                            <td><img src={IMG_PRE + sowing.image_small_url} style={{width: 150}}/></td>
                                            <td>{sowing.image_link}</td>
                                            <td>{sowing.s_time.substr(0, 10)}</td>
                                            <td>{sowing.e_time.substr(0, 10)}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-primary btn-xs"
                                                    to={{
                                                        pathname: "/sowingedit",
                                                        state: { sowing }
                                                    }}
                                                >编辑</Link>
                                                <button
                                                    className="btn btn-danger btn-xs"
                                                    onClick={()=>this._removeSowing(sowing._id)}
                                                >删除</button>
                                            </td>
                                        </tr>
                                    )
                                })
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
       this.props.reqSowingData();
    }

    // 根据id删除一条轮播图
    _removeSowing(id){
       // alert(id);
        removeSowingData(id).then((res)=>{
            console.log(res);
            if(res.status_code === 200){
                this.props.reqSowingData();
            }
            // this.props.reqSowingData()
        }).catch(()=>{
            alert('删除轮播图失败');
        })
    }
}

const mapStateToProps = (state)=>{
  return {
      sowingData: state.sowingData
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
     reqSowingData(){
         const action = getSowingDataAction();
         dispatch(action);
     }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SowingList);