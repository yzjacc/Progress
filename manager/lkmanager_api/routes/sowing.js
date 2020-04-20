import express from 'express';
import Sowing from './../models/Sowing';
import formidable from 'formidable';
import config from './../src/config';
import {basename} from 'path';

const router = express.Router({});

/**
 * 往数据库中插入一条新纪录
 */
router.post('/sowing/api/add', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        // 1. 处理表单字段
        const body = fields;
        // 解析上传的文件名称, 存入到数据库
        body.image_url = basename(files.image_url.path);
        body.image_small_url = basename(files.image_small_url.path);

        // 2. 操作数据库
        const sowing = new Sowing({
            // 图片的名称
            image_title: body.image_title,
            // 大图片的地址
            image_url: body.image_url,
            // 小图片的地址
            image_small_url: body.image_small_url,
            // 图片的链接
            image_link: body.image_link,
            // 上架时间
            s_time: body.s_time,
            // 下架时间
            e_time: body.e_time,
        });
        sowing.save((err, result) => {
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
 * 获取轮播图数据(所有)
 */
router.get('/sowing/api/list', (req, res, next) => {
    // 1. 接收传递的参数
    let {page, pageSize} = req.query;
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);
    // 2. 查询数据
    Sowing.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, sowings) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: sowings
        })
    });
});
/*
  查询一条数据  (条件 id)
  /sowing/api/single/:sowingId 模糊路径匹配
  /sowing/api/single/*  路径形式
  /sowing/api/single/111 /sowing/api/single/222 /sowing/api/single/aaa
  /sowing/api/single
  /sowing/api/single/a/b
 */
router.get('/sowing/api/single/:sowingId', (req, res, next) => {
    Sowing.findById(req.params.sowingId, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: docs
        })
    })
});
/**
 * 根据id修改一条数据
 */
router.post('/sowing/api/edit', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        // 1. 处理表单字段
        const body = fields;
        console.log(body);
        // 1.1 根据id查询数据
        Sowing.findById(body.id, (err, sowing) => {
            if (err) {
                return next(err);
            }

            // 解析上传的文件名称, 存入到数据库
            /*body.image_url = basename(files.image_url.path);
            body.image_small_url = basename(files.image_small_url.path);*/

            // 1.2. 取出要修改的数据
            sowing.image_title = body.image_title;
            sowing.image_url = body.image_url || basename(files.image_url.path);
            sowing.image_small_url = body.image_small_url || basename(files.image_small_url.path);
            sowing.image_link = body.image_link;
            sowing.s_time = body.s_time;
            sowing.e_time = body.e_time;
            sowing.c_time = Date.now();
            sowing.l_time = Date.now();

            // 3. 保存
            /*
              因为内部有一个_id，
              所以不会新增数据，而是更新已有的数据
            */
            sowing.save((err, result) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    status_code: 200,
                    result: '修改数据成功'
                })
            });
        });
    });


});
/**
 * 根据id删除一条记录
 */
router.get('/sowing/api/remove/:sowingId', (req, res, next) => {
    Sowing.remove({_id: req.params.sowingId}, (err, result) => {
        if (err) {
            return next(err);
        }
        console.log(result);
        res.json({
            status_code: 200,
            result: '删除数据成功！'
        });
    });
});
/*
  获取记录的总数
*/
router.get('/sowing/api/count', (req, res, next) => {
    Sowing.count((err, count) => {
        if (err) {
            return next(err);
        }
        res.json({
            status_code: 200,
            result: count
        });
    });
});

/*
  加载轮播图的列表页面
*/
router.get('/sowing_list', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10) || 1;
    const pageSize = 3;
    // 查询数据库中所有的数据
    Sowing.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, swoings) => {
        if (err) {
            return next(err);
        }
        // 查询总的条数
        Sowing.count((err, count) => {
            if (err) {
                return next(err);
            }
            //  总页码 = 总记录数 / 每页显示的页数
            const totalPage = Math.ceil(count / pageSize);
            // console.log(totalPage);
            res.render('sowing_list.html', {swoings, totalPage, page});
        });
    });
});
/*
  加载 添加轮播图的页面
*/
router.get('/sowing_add', (req, res, next) => {
    res.render('sowing_add.html');
});

module.exports = router;