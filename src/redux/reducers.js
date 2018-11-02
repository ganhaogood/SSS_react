import {combineReducers} from 'redux';
import {GET_CATEGORY_DATA,GET_HOME_DATA,GET_OPTIMIZE_DATA} from './action-types'
const init_home_data={};
function home_data(state=init_home_data,action) {
  switch(action.type){
    case GET_HOME_DATA:
      return action.data;
    default:
      return state
  }
}
const init_optimize_data={};
function optimize_data(state=init_optimize_data,action) {
  switch(action.type){
    case GET_OPTIMIZE_DATA:
      return action.data;
    default:
      return state
  }
}

const init_category_data=[];
function category_data(state=init_category_data,action) {
  switch(action.type){
    case GET_CATEGORY_DATA:
      return action.data;
    default:
      return state
  }
}
export default combineReducers({
  home_data,
  optimize_data,
  category_data
})