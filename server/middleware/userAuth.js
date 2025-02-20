import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "Not Authorized. Please Login Again"});
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecoded.id){
            req.user = { id: tokenDecoded.id };
            req.body.userId = tokenDecoded.id;
        }else{
            return res.json({success: false, message: "Not Authorized. Please Login Again"});
        }

        next();

    } catch (error) {
        return res.json({success: false, error: error.message});
    }
}

export default userAuth;