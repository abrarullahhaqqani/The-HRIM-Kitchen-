import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import {getAllUsers } from "../api"; 
import { setAllUserDetails } from "../context/actions/allUsersAction";
import {useEffect } from "react"; 
import DataTable from "./DataTable";
import { Avatar } from "../assets";
const DBUsers = () => { 
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {  
        dispatch(setAllUserDetails(data));
      });
    }
  }, []); 
  return <div className="flex items-center justify-self-center gap-4 pt-6 w-full"> 
  <DataTable 
     columns={[
      { title: "Image ", field: "photoURL" , render:(rowData)=>(
         <img 
           src={rowData.photoURL ? rowData.photoURL : Avatar}
           className="w-32 h-16 object-contain rounded-md"
         />
      ), },{ 
           title:"Name",
           field:"displayName",
      },{ 
         title:"Email", 
         field:"email",
      },
      { 
        title:"Verified", 
        field:"emailVerified",
        render:(rowData)=>( 
          <p 
           className={`px-2 py-1 w-32 text-center text-primary rounded-md ${rowData.emailVerified ? "bg-emerald-500" : "bg-red-500" } `}
          > 
            {rowData.emailVerified ? "Verified" : "Not Verified"}
          </p>
        ),
     },
     ]} 
     data={Array.isArray(allUsers) ? allUsers : []}
    title="List of Users" 
    // actions={[  
    //   { 
    //     icon:"edit", 
    //     tooltip:"Edit Product",
    //     onClick:(event,rowData)=>{ 
    //       alert("You want to edit "+rowData.product_Id); 
    //     },
    //   },
    //   { 
    //     icon:"delete", 
    //     tooltip:"Delete Data", 
    //     onClick:(event,rowData)=>{ 
    //       if(window.confirm("are u sure you want to delete this data")){ 
    //         deleteAProduct(rowData.product_Id).then(res=>{  
    //            dispatch(alertSuccess("Product Deleted Successfully")); 
    //            setInterval(() => {
    //              dispatch(alertNULL()); 
    //            },3000);
    //            getAllProducts().then(data=>{ 
    //                 dispatch(setAllProducts(data)); 
    //               }); 
    //         })
    //       }
    //       else{

    //       }
           


    //       },
        
    //   },
    // ]}
   /> 
  </div>;
};

export default DBUsers; 



