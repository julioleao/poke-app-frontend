const jwt = require('jsonwebtoken')

const db = [ {email: 'admin', password: 'admin'}]

const authenticate = async ({email, password}) => {
    const user = db.find((user) => user.password === password && user.email === email)

    if(user) {
        const token = await jwt.sign({email}, 'configurationkey')
        return (
            token,
            user
        );
    }
}

module.exports = {
    authenticate
};