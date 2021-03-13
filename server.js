const express=require("express")
const app=express();
require("./mongo")
const db1=require("./model/registers")
const bodyParser=require("body-parser")
const jwt=require("jsonwebtoken")
const bcrpyt=require("bcrypt")
const mw=require("./auth")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));





app.post("/signup",(req,res)=>{



  bcrpyt.hash(req.body.password,10,async(err,hash)=>{

    if(err){
      res.send("error")
    }

    else{

const data= await db1.find({email:req.body.email})


console.log(data.length)

if(data.length>0){
  res.send("this email is already register")
}else{


  const data= new db1();
      data.name=req.body.name
      data.email=req.body.email
      data.password=hash
      await data.save().then(()=>{res.send("data is saved")}).catch(()=>{res.send("data is not saverd")})
}
      
     }
  })
 
})



app.post("/signin",async(req,res)=>{


  const password=req.body.password;
  const username=req.body.name;

  await db1.find({name:username}).then((data)=>{

if(data.length==0){
  return res.status(404).send({msg:"User is not found"})
}
else{
   

  bcrpyt.compare(password,data[0].password,(err,result)=>{

    if(result){
     const token= jwt.sign({
       username:data[0].username,
       password:password,
       email:data[0].email
    }
      ,"xyz")

      res.status(200).send({msg:"User found and password match",data,token})  
    }
    else{

      
      res.status(200).send({msg:"User found but  password does not  match"})
    }
    
  })
  

}



  }).catch(err=>{res.send(err)})


})

app.get("/getdata",mw,async(req,res)=>{

  const data=await db1.find();
  res.send({data})

  console.log(req.userdata)
})
app.listen(8888,()=>{console.log("server is on")})