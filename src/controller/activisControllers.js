const { read, write } = require('../lib/FS')
const path = require('path')

module.exports = {
    editTeacherGet: (req, res) => {
        const { id } = req.params
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const teacher = users.find(user => user.id === parseInt(id))

        res.send(teacher)
    },
    
    editTeacherPOST: (req, res) => {
        const { id } = req.params
        const { username, password, phone } = req.body
        const users = read(path.resolve(__dirname, '../model/users.json'))

        const teacher = users.find(user => user.id === parseInt(id))

        const editedTeacher = {
            id: teacher.id,
            username: username,
            phone: phone,
            password: password,
            role: teacher.role,
            courseId: teacher.courseId,
            course: teacher.course
        }

        users.splice(users.indexOf(teacher), 1, editedTeacher)

        write(path.resolve(__dirname, '../model/users.json'), users)
       
        res.redirect('/admin')
    },

    deleteTeacher: (req, res) => {
        const { id } = req.params
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const teacher = users.find(user => user.id === parseInt(id))

        users.splice(users.indexOf(teacher), 1)

        write(path.resolve(__dirname, '../model/users.json'), users)

        res.sendStatus(200)
    },

    editStudentGET: (req, res) => {
        const { id } = req.params
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const student = users.find(user => user.id === parseInt(id))

        res.send('success')
    },

    editStudentPOST: (req, res) => {
        const { id } = req.params
        const { username, password, phone } = req.body
        const users = read(path.resolve(__dirname, '../model/users.json'))

        const student = users.find(user => user.id === parseInt(id))

        const editedStudent = {
            id: student.id,
            username: username,
            phone: phone,
            password: password,
            role: student.role,
            groupId: student.groupId,
            group: student.group
        }

        users.splice(users.indexOf(student), 1, editedStudent)

        write(path.resolve(__dirname, '../model/users.json'), users)
       
        res.redirect('/admin')
    },

    deleteStudent: (req, res) => {
        const { id } = req.params
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const student = users.find(user => user.id === parseInt(id))

        users.splice(users.indexOf(student), 1)

        write(path.resolve(__dirname, '../model/users.json'), users)

        res.send('success')
    }
}