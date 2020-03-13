import * as constants from './actionTypes'

// 默认的数据
const defaultState = {
    homeData: {},
    sowingData: []
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
    }
    return state;
}