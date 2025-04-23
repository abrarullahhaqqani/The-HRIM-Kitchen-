const router = require("express").Router();
const admin = require("firebase-admin"); 
const { querysnap } = require("firebase-admin/firestore");
const db=admin.firestore(); 
db.settings({ ignoreUndefinedProperties:true});  
let response=[]; 
router.post("/create"  , async (req,res)=>{ 
     try{ 
         const id=Date.now(); 
         const data = {
            product_Id:id,  
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            imageURL: req.body.imageURL,
          };  

          const response=await db.collection("products").doc('/${id}/').set(data);
          console.log(response); 
          // this give us a request we have to send this to user 
          return res.status(200).send({success:true ,data:response}); 
     }
     catch(err){  
         return res.send({success:false ,msg:'Error :${err} '  }); 
     }
})
  // getting  all products 
   router.get("/all",async (req,res)=>{ 
      (async ()=>{ 
          try{ 
            let query=db.collection("products"); 
            
            await query.get().then(querysnap=>{ 
                let docs=querysnap.docs;
                docs.map(doc=>{ 
                    console.log("kuch bhi dekho ", doc.data());
                    response.push({...doc.data() });  
                });
                return response; 
            });
            return res.status(200).send({success:true ,data:response}); 
          }
          catch(err){ 
             return res.send({ success:false, msg: 'Error : ${err} ' });  
          }
      })(); 
   });

  ///  deleting a product 
  router.delete("/delete/:product_Id", async (req,res)=>{ 
     const product_Id=req.params.product_Id;
     try{ 
      await db.collection("products").doc('/${product_Id}/').delete().then(result=>{ 
         return res.status(200).send({success:true,data: result }); 
      });
     }
     catch(err){ 
         return res.send({success:false,msg:'Error :${err} '}); 
     }
  })
 module.exports=router; 