const User= require('../models/User');
const jwt= require('jsonwebtoken');

module.exports.checkUser = async (req,res,next) => {
    const token = req.cookies.jwt;
    if(token && (token!=='expiredtoken')) {
        jwt.verify(token, process.env.JWT_SECRET_USER, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                return res.status(401).json({message: "1. Unauthorized Access!!!"});
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                if(!user) {
                    return res.status(401).json({message: "2. Unauthorized Access!!!"});
                }
                req.user=user;
                next();
            }
        })
    } else {
        return res.status(401).json({message: "3. Unauthorized Access!!!"});
    }
}