const { SECRET_KEY } = require('../config')
const { verify } = require('jsonwebtoken')

module.exports = {
    infoGET: (req, res) => {
        const { token } = req.cookies

        const verifiedUser = verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(401)
            return decoded
        })
        if (!verifiedUser) {
            res.sendStatus(401)
        }

        res.render('info')
    }
}