 export const setUserDetails=(user)=>{
   return { 
  type: "SET_USER", 
   user:user, // passing the user details
    };

}; 

export const getUserDetails=()=>{
   return { 
    type: "GET_USER", 
   };
};
//    return {
//     type: "SET_USER",
//     user:user,
//    };

// };

// export const getUserDetails=()=>{
//    return {
//     type: "GET_USER",
//    };
// };
