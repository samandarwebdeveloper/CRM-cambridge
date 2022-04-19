const { read } = require('../lib/FS')
const path = require('path')
const { verify } = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = {
    studentGET: (req, res) => {
        const { token } = req.cookies
        
        const groups = read(path.resolve(__dirname, '../model/groups.json'))

        const verifiedUser = verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(401)
            return decoded
        })
        if (!verifiedUser) {
            res.sendStatus(401)
        }
        if(verifiedUser.role !== 'student') {
            return res.sendStatus(401)
        }
        
        const studentGroup = groups.filter(group => group.id === verifiedUser.groupId)

        res.render('student', { studentGroup })
    }
}