import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import {CChart} from "@coreui/react-chartjs"; 
const DBHome = () => { 
  const products=useSelector((state)=>state.products); 
  const dispatch=useDispatch(); 
  
  const drinks=products.filter((item)=> item.product_category===1);
  const deserts=products.filter((item)=>item.product_category===2); 
  const fruits=products.filter((item)=>item.product_category===3); 
  const rice=products.filter((item)=>item.product_category===4); 
  const curry=products.filter((item)=>item.product_category===5); 
  const Chinese=products.filter((item)=>item.product_category===6); 
  const bread=products.filter((item)=>item.product_category===6); 

  useEffect(()=>{ 
    if(!products){ 
      getAllProducts().then((data)=>{  
        console.log(data); 
        dispatch(setAllProducts(data)); 
      }); 
    }
  },[]);  
/// making two grids 
/// first grid will be for the products
/// second grid will be for the orders 
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full"> 
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full"> 
        <div className="flex  items-center justify-center "> 
           <div className="w-340 md:w-508"> 
           <CChart 
             type="bar"
             data={{ 
               labels:[
               "Drinks","Desserts","Fruits","Rice","Curry","Chinese","Bread"
               ],
               datasets:[
                   { 
                    label:"Category wise products",
                    backgroundColor:"#f87979",
                    data:[drinks?.length,
                          deserts?.length,
                          fruits?.length, 
                          rice?.length,
                          curry?.length,
                          Chinese?.length,
                          bread?.length,
                    ],
                   },
               ],
             }}
             labels="months"
            />
           </div>
        </div>
        <div className="w-full h-full flex  items-center justify-center "> 
           <div className="w-275 md:w-460 "> 
             <CChart 
              type="doughnut"
              data={{ 
                labels:["Orders"
                  ,"Delivered",
                  "Cancelled",
                  "Paid",
                  "Not Paid" 
                ],
                datasets:[ 
                  { 
                    backgroundColor:["#41B883","#E46651","#00D8FF","#DD1B16"],
                    data:[40,20,12,39],
                  },
                ],
              }}
             />
           </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
