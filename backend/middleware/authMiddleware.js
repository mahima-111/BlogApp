import jwt from 'jsonwebtoken';

const verifyToken=(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            res.status(401);
            throw new Error('unauthorized! no token');
        }
        
        const tokenData=jwt.verify(token,process.env.JWT_SECRET);
        if(!tokenData){
            res.status(401);
            throw new Error('unauthorized! token is not valid');
        }
        req.user=tokenData;
        next();
    }
    catch(err){
        next(err);
    }
}

export default verifyToken;