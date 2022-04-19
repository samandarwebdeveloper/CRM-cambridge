const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const router = require('./controller/index')

const { PORT } = require('./config')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/', router)

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

