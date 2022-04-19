const { read } = require('../lib/FS')
const path = require('path')
const { sign } = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = {
    LOGIN: (req, res) => {
        const { username, password } = req.body
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const foundUser = users.find(user => user.username === username && user.password === password)

        if (!foundUser) {
            res.redirect('/')
        }

        res.cookie('token', sign({ id: foundUser.id, role: foundUser.role, groupId: foundUser.groupId }, SECRET_KEY))

        setTimeout(() => {
            if(foundUser.role === 'admin') {
                res.redirect('/admin')
            }
            if(foundUser.role === 'teacher') {
                res.redirect('/teacher')
            }
            if(foundUser.role === 'student') {
                res.redirect('/student')
            }
        }, 1000)
    }
}