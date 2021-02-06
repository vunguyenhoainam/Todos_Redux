import * as actionTypes from "../actions/actionTypes"
import { v4 as uuidv4 } from "uuid";

const initialState = {
    dataTodos : [ {title: "Demo_1", id : uuidv4(), status : false }, {title: "Demo_2", id : uuidv4(), status : false }]
}
const reducerTodos = (state = (JSON.parse(localStorage.getItem('keyTodos'))) !== null ? JSON.parse(localStorage.getItem('keyTodos')) : initialState , action) => {
    
    localStorage.setItem("keyTodos",JSON.stringify({...state}));
    
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            const valueTodos = {
                title : action.payload,
                id : uuidv4(),
                status : false
            }
            localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : [...state.dataTodos, valueTodos]}));
            return {
                ...state, dataTodos : [...state.dataTodos, valueTodos]
            }

        case actionTypes.EDIT_ITEM:
            localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : state.dataTodos.map(todo => (todo.id === action.payload.id) ? action.payload : todo)}))
            return {
                ...state, dataTodos : state.dataTodos.map(todo => (todo.id === action.payload.id) ? action.payload : todo)
            }

        case actionTypes.DEL_ITEM:
            localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : state.dataTodos.filter( item => item.id !== action.payload.id)}));
            return {
                ...state, dataTodos : state.dataTodos.filter( item => item.id !== action.payload.id)
            }

        case actionTypes.EDIT_STATUS:
            const Item = action.payload;
            action.payload.status = !action.payload.status;
            localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : state.dataTodos.map((item) => (item.id === action.payload.id ? Item : item))}));
            return {
                ...state, dataTodos : state.dataTodos.map((item) => (item.id === action.payload.id ? Item : item))
            }
        case actionTypes.DEL_ALL:
            localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : state.dataTodos.filter( item => item.status !== true)}));
            return {
                ...state, dataTodos : state.dataTodos.filter( item => item.status !== true)
            }
        case actionTypes.CHECK_ALL: 
        console.log("CHECK :",action.payload);
            if(action.payload){
                localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : state.dataTodos.map( item => item.status === false ? item : {title : item.title, id: item.id, status: false})}));
                return {
                    ...state, dataTodos : state.dataTodos.map( item => item.status === false ? item : {title : item.title, id: item.id, status: false})
                }
            }
            else{
                localStorage.setItem("keyTodos",JSON.stringify({...state, dataTodos : state.dataTodos.map( item => item.status === true ? item : {title : item.title, id: item.id, status: true})}));
                return {
                    ...state, dataTodos : state.dataTodos.map( item => item.status === true ? item : {title : item.title, id: item.id, status: true})
                }
            }
        default:
            return state;
    }
}
export default reducerTodos;
