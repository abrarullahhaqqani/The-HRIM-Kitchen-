import {combineReducers} from "redux"; 
import userReducer from "./userReducer"; 
import alertReducer from "./AlertReducer";
import productReducer from "./productReducer"; 
import allUserReducer from "./allUserReducer";

const myReducers=combineReducers({
    user:userReducer,
    alert:alertReducer,
    products:productReducer,
    allUsers:allUserReducer,
 }); 

 export default myReducers; 

