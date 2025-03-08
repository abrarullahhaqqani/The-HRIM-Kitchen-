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
      export const setUserNull=()=>{
         return { 
             type: "SET_USER_NULL", 
              user:null, // passing the user details
               };
           
           };      