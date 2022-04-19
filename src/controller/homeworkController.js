const { read, write } = require('../lib/FS')
const path = require('path')


module.exports = {
    homeworkPOST: (req, res) => {
        const { homework, description } = req.body
        const file = req.file
        const { id } = req.params

        const homeworks = read(path.resolve(__dirname, '../model/homeworks.json'))
        
        const newHomework = {
            id: homeworks.length + 1,
            goupId: parseInt(id),
            homework: homework,
            description: description,
            file: file.filename,
            path: `/uploads/${file.filename}`
        }

        homeworks.push(newHomework)
        write(path.resolve(__dirname, '../model/homeworks.json'), homeworks)

        res.redirect('/teacher')
    },
    homeworkGET: (req, res) => {
        const { id } = req.params
        const homeworks = read(path.resolve(__dirname, '../model/homeworks.json'))
        const foundHomework = homeworks.find(homework => homework.goupId === parseInt(id))

        res.send(new Array(foundHomework))
    }
}