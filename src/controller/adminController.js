const { read } = require('../lib/FS')
const path = require('path')
const { verify } = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = {
    adminGET : (req, res) => {
        const { token } = req.cookies

        const users = read(path.resolve(__dirname, '../model/users.json'))
        const groups = read(path.resolve(__dirname, '../model/groups.json'))
        const courses = read(path.resolve(__dirname, '../model/courses.json'))

        const verifiedUser = verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(401)
            return decoded
        })
        if (!verifiedUser) {
            res.sendStatus(401)
        }
        if(verifiedUser.role !== 'admin') {
            return res.sendStatus(401)
        }
        res.render('admin', { users, groups, courses })
    },
    userGET : (req, res) => {
        const { id } = req.params

        const users = read(path.resolve(__dirname, '../model/users.json'))
        const teacher = new Array(users.find(user => user.courseId === parseInt(id))) 

        res.send(teacher)
    },
    editTeacherGet : (req, res) => {
        
    }
}