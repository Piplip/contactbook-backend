const express = require('express')
const cors = require('cors')
const ApiError = require("./app/api-error")

const app = express()
const contactRouters = require('./app/routes/contact.route')

app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactRouters)

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'))
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        msg: err.message || 'Internal Server Error'
    })
})

module.exports = app;