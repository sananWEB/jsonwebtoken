const mongo=require("mongoose")

mongo.Promise=global.Promise;
require("dotenv").config();  
mongo.connect("mongodb+srv://sanan:sanan@ecommerce.fo13n.mongodb.net/jwt?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true }).then(()=>{console.log("DataBase is Connected")}).catch(()=>{
    console.log("Database is not connected")
})  