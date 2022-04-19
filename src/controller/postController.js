const { read, write } = require('../lib/FS')
const path = require('path')

module.exports = {
    CoursePOST: (req, res) => {
        const { courseName, type, courseDescription, price } = req.body
        const courses = read(path.resolve(__dirname, '../model/courses.json'))

        const newCourse = {
            id: courses.length + 1,
            name: courseName,
            type: type,
            description: courseDescription,
            price: price
        }

        courses.push(newCourse)
        write(path.resolve(__dirname, '../model/courses.json'), courses)

        res.redirect('/admin')
    },

    TeacherPOST: (req, res) => {
        const { username, phone, password, courseId } = req.body
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const courses = read(path.resolve(__dirname, '../model/courses.json'))

        const foundCourse = courses.find(course => course.id === parseInt(courseId))
        
        const newTeacher = {
            id: users.length + 1,
            username: username,
            phone: phone,
            password: password,
            role: 'teacher',
            courseId: foundCourse.id,
            course: foundCourse.name
        }

        const editedCourse = {
            id: foundCourse.id,
            name: foundCourse.name,
            type: foundCourse.type,
            description: foundCourse.description,
            price: foundCourse.price,
            teacherId: newTeacher.id,
            teacher: newTeacher.username
        }

        users.push(newTeacher)
        courses.splice(courses.indexOf(foundCourse), 1, editedCourse)

        write(path.resolve(__dirname, '../model/users.json'), users)
        write(path.resolve(__dirname, '../model/courses.json'), courses)

        res.redirect('/admin')
    },

    GroupPOST: (req, res) => {
        const { groupName, course, type } = req.body
        const groups = read(path.resolve(__dirname, '../model/groups.json'))
        const users = read(path.resolve(__dirname, '../model/users.json'))

        const foundUser = users.find(user => user.courseId === parseInt(course))

        const newGroup = {
            id: groups.length + 1,
            name: groupName,
            course: foundUser.course,
            teacher: foundUser.username,
            teacherId: foundUser.id,
            type: type
        }

        groups.push(newGroup)
        write(path.resolve(__dirname, '../model/groups.json'), groups)

        res.redirect('/admin')
    },

    StudentPOST: (req, res) => {
        const { username, phone, password, groupId } = req.body
        const users = read(path.resolve(__dirname, '../model/users.json'))
        const groups = read(path.resolve(__dirname, '../model/groups.json'))

        const foundGroup = groups.find(group => group.id === parseInt(groupId))
        

        const newStudent = {
            id: users.length + 1,
            username: username,
            phone: phone,
            password: password,
            role: 'student',
            course: foundGroup.course,
            groupId: foundGroup.id,
            group: foundGroup.name
        }

        users.push(newStudent)
        write(path.resolve(__dirname, '../model/users.json'), users)

        res.redirect('/admin')
    }
}