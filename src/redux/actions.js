import {GET_CATEGORY_DATA,GET_HOME_DATA,GET_OPTIMIZE_DATA} from './action-types'
import {reqCategoryData,reqHomeData,reqOptimizeData} from '../api'
const receiveHomeData=(homeData)=>({type:GET_HOME_DATA,data:homeData})
const receiveOptimizeData=(optimizeData)=>({type:GET_OPTIMIZE_DATA,data:optimizeData})
const receiveCategoryData=(categoryData)=>({type:GET_CATEGORY_DATA,data:categoryData})


export function getHomeData() {
  return async dispatch=>{

    const result=await reqHomeData();
    if(result.code===0){
      dispatch(receiveHomeData(result.data))
    }
  }
}
export function getOptimizeData(cb) {
  return async dispatch=>{
    const result=await reqOptimizeData();
    if(result.code===0){
      dispatch(receiveOptimizeData(result.data))
      cb&&cb()
    }
  }
}
export function getCategoryData() {
  return async dispatch=>{
    const result=await reqCategoryData();
    if(result.code===0){
      dispatch(receiveCategoryData(result.data))
    }
  }
}


