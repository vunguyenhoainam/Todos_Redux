import { combineReducers } from "redux";
import TodosReducer from "./TodosReducer";

const rootReducer = combineReducers({
    TodosReducer,
})

export default rootReducer;