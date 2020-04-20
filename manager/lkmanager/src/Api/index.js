import ajax from './ajax'

// 0. 定义基础路径
const BASE_URL = '';

// 1. 请求首页的数据
export const getHomeData = () => ajax(BASE_URL + '/home/api/list');
// 2. 请求轮播图的数据
export const getSowingData = () => ajax(BASE_URL + '/sowing/api/list');
// 3. 添加轮播图数据
export const addSowingData = (data)=> ajax(BASE_URL + '/sowing/api/add', data, 'POST');
// 4. 删除一条轮播图数据
export const removeSowingData = (id)=>ajax(BASE_URL + '/sowing/api/remove/' + id);
// 5. 修改轮播图数据
export const editSowingData = (data)=> ajax(BASE_URL + '/sowing/api/edit', data, 'POST');
// 6. 用户登录
export const getUserData = (data)=> ajax(BASE_URL + '/user/api/login', data, 'POST');
// 7. 修改用户数据
export const editUserData = (data)=> ajax(BASE_URL + '/user/api/edit', data, 'POST');
// 8. 修改用户密码
export const editPwdData = (data)=> ajax(BASE_URL + '/user/api/reset', data, 'POST');
// 9. 请求用户的数据
export const getStudentData = () => ajax(BASE_URL + '/stu/api/list');
