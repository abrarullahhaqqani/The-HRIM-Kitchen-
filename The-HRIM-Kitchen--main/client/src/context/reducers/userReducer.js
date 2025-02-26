const userReducer = (state=null, action) => {
    switch(action.type){
        case "GET_USER":
            return state; /// value of the state

        case "SET_USER":
                return action.user; /// return 
        default:
               return state;
    }
};
export default userReducer;
