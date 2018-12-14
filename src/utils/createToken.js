const jwt =  require('jsonwebtoken')
const {SECRET_KEY} =  require('../const');

module.exports = (user) =>{
    const  payload = {
        id:user._id,
        email:user.email,
        name:user.name
    }
    let token  =  jwt.sign(payload,SECRET_KEY);
    
    return token;
}