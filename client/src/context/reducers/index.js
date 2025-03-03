import {combineReducers} from "redux"; 
import userReducer from "./userReducer"; 
import alertReducer from "./AlertReducer";
const myReducers=combineReducers({
    user:userReducer,
    alert:alertReducer
 }); 

 export default myReducers; 

