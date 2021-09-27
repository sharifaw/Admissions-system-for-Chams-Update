const jwt = require('jsonwebtoken');


const createtoken = (id, email,expires) => {
    return jwt.sign(
        { id: id, email: email },
        "jsfashlaekhe",
        {
            expiresIn: expires
        }
    );

}

module.exports={createtoken};