import express from 'express';
import Home from './../models/Home';
import formidable from 'formidable';
import config from './../src/config';
import {basename} from 'path';

const router = express.Router({});

/**
 * 往数据库中插入一条新纪录
 */
router.post('/home/api/add', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }

        // 2. 操作数据库
        const home = new Home({
            // 登录用户数
            login_user: fields.login_user,
            // 新增注册数
            new_register: fields.new_register,
            // 课程新增学员
            new_stu_course: fields.new_stu_course,
            // 班级新增学员
            new_stu_classes: fields.new_stu_classes,
            // 新增会员
            new_member: fields.new_member,
            // 未回复问答
            not_reply: fields.not_reply,
            // 订单统计
            order_counter: {
                "web": fields.web,
                "java": fields.java,
                "python": fields.python,
                "bigdata": fields.bigdata,
                "ui": fields.ui
            },
        });
        home.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                status_code: 200,
                result: '添加数据成功'
            });
        })
    });
});

/**
 * 获取首屏数据
 */
router.get('/home/api/list', (req, res, next) => {
    Home.find().exec((err, home) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: home
        })
    });
});
module.exports = router;