import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/lk_data');

const homeSchema = mongoose.Schema({
    // 登录用户数
    login_user: {type: String, required: true},
    // 新增注册数
    new_register: {type: String, required: true},
    // 课程新增学员
    new_stu_course: {type: String, required: true},
    // 班级新增学员
    new_stu_classes: {type: String, required: true},
    // 新增会员
    new_member: {type: String, required: true},
    // 未回复问答
    not_reply: {type: String, required: true},
    // 订单统计
    order_counter: {type: Object, require: true},
    // 当前编辑的时间
    c_time: {type: Date, default: Date.now},
    // 最后编辑时间
    l_time: {type: Date, default: Date.now},
});

const Home = mongoose.model('Home', homeSchema);
export default  Home;