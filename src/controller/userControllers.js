const path = require('path')
const { read } = require('../lib/FS')
module.exports = {
    GET: (_, res) => {
        const users = read(path.resolve(__dirname, '../model/users.json'))
        res.json(users)
    }
}