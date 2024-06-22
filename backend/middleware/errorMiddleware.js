const errorHandler=(err,req,res,next)=>{
    const message=err.message;
    let status=res.statusCode || 400;
    if(res.statusCode===200){
        status=400;
    }
    const error={message,status};
    res.status(status).json(error);
}

export default errorHandler;