const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const { GET } = require('../controller/userControllers')
const { LOGIN } = require('../middleware/auth')
const { adminGET, userGET } = require('../controller/adminController')
const { teacherGET } = require('../controller/teacherController')
const { studentGET } = require('../controller/studentController')
const { CoursePOST, TeacherPOST, GroupPOST, StudentPOST } = require('../controller/postController')
const { homeworkPOST, homeworkGET } = require('../controller/homeworkController')
const { editTeacherGet, editTeacherPOST, deleteTeacher, deleteStudent, editStudentGET, editStudentPOST } = require('./activisControllers')
const { infoGET } = require('../controller/infoController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router
    .get('/', (req, res) => {
        res.render('index')
    })
    .get('/users', GET)
    .post('/login', LOGIN)
    .get('/admin', adminGET)
    .get('/info', infoGET)
    .get('/teachers/:id', userGET)
    .get('/teacher', teacherGET)
    .get('/student', studentGET)
    .post('/course', CoursePOST)
    .post('/teacher', TeacherPOST)
    .post('/group', GroupPOST)
    .post('/student', StudentPOST)
    .post('/homework/:id', upload.single('file'), homeworkPOST)
    .get('/homework/group/:id', homeworkGET)
    .get('/users/edit-teacher/:id', editTeacherGet)
    .post('/users/edit-teacher/:id', editTeacherPOST)
    .get('/users/edit-student/:id', editStudentGET)
    .post('/users/edit-student/:id', editStudentPOST)
    .delete('/users/delete-teacher/:id', deleteTeacher)
    .delete('/users/delete-student/:id', deleteStudent)

module.exports = router