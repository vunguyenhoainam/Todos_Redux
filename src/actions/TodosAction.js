import * as actionTypes from "./actionTypes";

export const addItem = (data) => {
    return {
        type : actionTypes.ADD_ITEM,
        payload : data
    }
}
export const editItem = (data) => {
    return {
        type : actionTypes.EDIT_ITEM,
        payload : data
    }
}
export const delItem = (data) => {
    return {
        type : actionTypes.DEL_ITEM,
        payload : data
    }
}
export const status = (data) => {
    return {
        type : actionTypes.EDIT_STATUS,
        payload : data
    }
}
export const delAll = () => {
    return {
        type : actionTypes.DEL_ALL
    }
}
export const checkAll = (data) => {
    return {
        type : actionTypes.CHECK_ALL,
        payload : data
    }
}