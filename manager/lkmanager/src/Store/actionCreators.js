import * as constants from './actionTypes'
import {getHomeData, getSowingData, getUserData, getStudentData} from './../Api/index'

// 0. 获取首页数据
export const getHomeDataAction = () => {
    return (dispatch)=>{
        // 请求网络数据
        getHomeData().then((res)=>{
            if(res.status_code === 200){
                const homeData = res.result[0];
                dispatch({
                    type: constants.INIT_HOME_DATA,
                    homeData
                })
            }
        }).catch(()=>{
            alert('首页数据请求失败！')
        })
    }
};

// 1. 获取轮播图列表数据
export const getSowingDataAction = () => {
    return (dispatch)=>{
        // 请求网络数据
        getSowingData().then((res)=>{
            if(res.status_code === 200){
                const sowingData = res.result;
                dispatch({
                    type: constants.INIT_SOWING_DATA,
                    sowingData
                })
            }
        }).catch(()=>{
            alert('首页数据请求失败！')
        })
    }
};

// 2. 用户登录
export const getUserDataAction = (data, callback)=>{
    return (dispatch)=>{
       // 2.1 发起网络请求
       getUserData(data).then((res)=>{
           if(res.status_code === 200){
               const userData = res.result;
               dispatch({
                   type: constants.INIT_USER_DATA,
                   userData
               });
               // 成功的回调
               callback && callback(userData);
           }else {
               alert(res.result);
           }
       }).catch((error)=>{
             alert(error);
       })
    }
};

// 3. 获取学生列表列表数据
export const getStudentDataAction = () => {
    return (dispatch)=>{
        // 请求网络数据
        getStudentData().then((res)=>{
            if(res.status_code === 200){
                const studentData = res.result;
                dispatch({
                    type: constants.INIT_STUDENT_DATA,
                    studentData
                })
            }
        }).catch(()=>{
            alert('学生数据请求失败！')
        })
    }
};
