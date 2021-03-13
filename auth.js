const jwt=require("jsonwebtoken")

const mw=(req,res,next)=>{

    try {

        const token=req.header("token");
    //console.log(token)
    const tokenv=jwt.verify(token,"xyz")

    req.userdata=tokenv

    next();
        
    } catch (error) {
        res.status(404).json({
            err:"error is occur"
        })
    }
    
}

module.exports=mw