import React from "react";
import { DataTable } from "../components";
import { HiCurrencyRupee } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";  
import { Tooltip } from "@mui/material";
import { deleteAProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { alertNULL, alertSuccess } from "../context/actions/AlertActions";
const DBItems = () => { 
  const products=useSelector((state)=>state.products); 
  const dispatch=useDispatch(); 
  return (
      <div className="flex items-center justify-self-center gap-4 pt-6 w-full"> 
        <DataTable 
           columns={[
            { title: "Image ", field: "imageURL" , render:(rowData)=>(
               <img 
                 src={rowData.imageURL}
                 className="w-32 h-16 object-contain rounded-md"
               />
            ), },{ 
                 title:"Name",
                 field:"product_name",
            },{ 
               title:"Category", 
               field:"product_category",
            },
            { 
              title:"Price",
              field:"product_price",
              render:(rowData)=>( 
                <p className="text-xl font-semibold text-textColor flex items-center justify-center"> 
                    <HiCurrencyRupee className="text-red-400"/>  
                   {parseFloat(rowData.product_price).toFixed(2)}
                </p>
              )
            }
           ]} 
           data={Array.isArray(products) ? products : []}
          title="List of Products" 
          actions={[ 
            { 
              icon:"edit", 
              tooltip:"Edit Product",
              onClick:(event,rowData)=>{ 
                alert("You want to edit "+rowData.product_Id); 
              },
            },
            { 
              icon:"delete", 
              tooltip:"Delete Data", 
              onClick:(event,rowData)=>{ 
                if(window.confirm("are u sure you want to delete this data")){ 
                  deleteAProduct(rowData.product_Id).then(res=>{  
                     dispatch(alertSuccess("Product Deleted Successfully")); 
                     setInterval(() => {
                       dispatch(alertNULL()); 
                     },3000);
                     getAllProducts().then(data=>{ 
                          dispatch(setAllProducts(data)); 
                        }); 
                  })
                }
                else{

                }
                 


                },
              
            },
          ]}
         /> 
        </div>
  );
};

export default DBItems;
