
 const adminAuth=(req,res,next)=>{
    console.log("Admin auth is getting Checked !!");
    const token = "xyz";
    const isAdminAuthorize = token === "xyz";
    if(!isAdminAuthorize){
        res.status(401).send("Unauthorized Access");
    }else{
        next();
    }
};

module.exports={
    adminAuth,
}
