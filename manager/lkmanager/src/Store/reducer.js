import * as constants from './actionTypes'

// 默认的数据
const defaultState = {
    homeData: {},
    sowingData: [],
    userData: {},
    studentData: []
};

export default (state = defaultState, action)=>{
    if(action.type === constants.INIT_HOME_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.homeData = action.homeData;
        return newState;
    }else if(action.type === constants.INIT_SOWING_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.sowingData = action.sowingData;
        return newState;
    }else if(action.type === constants.INIT_USER_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        // 把用户数据存入本地
        sessionStorage.setItem('userData', JSON.stringify(action.userData));
        newState.userData = action.userData;
        return newState;
    }else if(action.type === constants.INIT_STUDENT_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.studentData = action.studentData;
        return newState;
    }
    return state;
}