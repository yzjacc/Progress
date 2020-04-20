import React, {Component} from 'react';
import {addSowingData} from './../../Api/index'
import { Link } from "react-router-dom";


class SowingAdd extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="body advert">
                    <ol className="breadcrumb">
                        <li><Link to="/sowing/list">轮播图管理</Link></li>
                        <li className="active">添加轮播图</li>
                    </ol>
                    <div className="advert-add">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">图片名称</label>
                                <div className="col-md-5">
                                    <input ref="image_title" type="text" className="form-control input-sm" placeholder="填写图片名称"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">大图片</label>
                                <div className="col-md-5">
                                    <input ref="image_url" type="file" className="form-control input-sm" placeholder="选择大图片" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">小图片</label>
                                <div className="col-md-5">
                                    <input ref="image_small_url"  type="file" className="form-control input-sm" placeholder="选择小图片" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">跳转页面链接</label>
                                <div className="col-md-5">
                                    <input ref="image_link" type="text" className="form-control input-sm" placeholder="填写跳转链接" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">计划上架时间</label>
                                <div className="col-md-5">
                                    <input ref="s_time" type="text" className="form-control input-sm" placeholder="请填写上架的链接" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">计划下架时间</label>
                                <div className="col-md-5">
                                    <input ref="e_time"  type="text" className="form-control input-sm" placeholder="请填写下架的链接" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-8">
                                    <button onClick={()=>this._dealWithClick()} className="btn btn-danger btn-sm pull-right">添加轮播图</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _dealWithClick(){
        // 1. 获取用户输入的内容
        const image_title = this.refs.image_title.value;
        const image_url = this.refs.image_url.files[0];
        const image_small_url = this.refs.image_small_url.files[0];
        const image_link = this.refs.image_link.value;
        const s_time = this.refs.s_time.value;
        const e_time = this.refs.e_time.value;
        // console.log(image_title, image_url, image_small_url, image_link, s_time, e_time);

        // 2. 验证数据不为空
        if(!image_title || !image_url || !image_small_url || !image_link || !s_time || !e_time){
            alert('输入的内容不能为空！');
            return;
        }

        // 3. 创建formData对象
        let formData = new FormData();
        formData.append('image_title', image_title);
        formData.append('image_url', image_url);
        formData.append('image_small_url', image_small_url);
        formData.append('image_link', image_link);
        formData.append('s_time', s_time);
        formData.append('e_time', e_time);

        // 4. 发起请求
        addSowingData(formData).then((res)=>{
            if(res.status_code === 200){
               //  this.props.history.goBack();
                this.props.history.push('/sowinglist');
            }
        }).catch((error)=>{
            console.log(error);
            alert('上传数据失败！');
        })
    }
}
export default SowingAdd;