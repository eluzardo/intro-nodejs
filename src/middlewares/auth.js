const jwt = require('jsonwebtoken');

const isAuth = (req,res,next)=>{
    try {
        console.log('req.headers', req.headers);
        const {token} = req.headers;
        if (token){
            const data = jwt.verify(token, process.env.JWT_SECRET);
            console.log('jwt data', data);
            if(data.userId =! req.body.userId && data.role ==! 'admin'){
                throw {
                    code: 403,
                    status: 'ACCESS_DENIED', 
                    message: 'Missing permission or invalid role'
                };
            }
            next();
            }else{
            throw {
                code: 403,
                status: 'ACCESS_DENIED', 
                message: 'Missing header token'
            };        
        };
        
    } catch (error) {
        res 
            .status(error.code || 500)
            .send({status: error.status || 'ERROR', message: error.message});
    }
};

const isValidHostname = (req,res,next)=>{
    const validHosts = ['localhost', ' dina.ec'];
    if(validHosts.includes(req.hostname)){
        next();
    }else{
        res.status(403).send({status: 'ACCESS_DENIED'})
    }
};

module.exports = {isAuth, isValidHostname};