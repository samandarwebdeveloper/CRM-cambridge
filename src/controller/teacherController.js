const { read } = require('../lib/FS')
const path = require('path')
const { verify } = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = {
    teacherGET: (req, res) => {
        const { token } = req.cookies
        
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const groups = read(path.resolve(__dirname, '../model/groups.json'))

        const verifiedUser = verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(401)
            return decoded
        })
        if (!verifiedUser) {
            res.sendStatus(401)
        }
        if(verifiedUser.role !== 'teacher') {
            return res.sendStatus(401)
        }
        const teacherGroups = groups.filter(group => group.teacherId === verifiedUser.id)
        const techerStudents = users.filter(user => teacherGroups.find(group => group.id === user.groupId))

        res.render('teacher', { users: techerStudents, groups: teacherGroups })
    }
}