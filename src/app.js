require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors());

const build_page = require('./utils/buildPage')

app.get('/', async (req, res) => {
    return res.send(build_page('index'))
})

app.get('/*', (req, res) => {
    res.redirect('/')
})

server.listen(process.env.PORT, async () => {
    console.clear()
    console.log(`Now listening on port ${process.env.PORT} (${process.env.URL})`)
    console.log()
})