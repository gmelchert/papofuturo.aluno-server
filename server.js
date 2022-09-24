import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { readdirSync } from 'fs'

const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost')
    next()
})

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))

app.use(express.json())
app.use(cors())

const files = readdirSync('./routes').filter(e => e.endsWith('.js') && !e.startsWith('utils') && !e.startsWith('test'))
files.forEach(async e => {
    const { default: route } = await import(`./routes/${e}`)
    route.forEach(e => e(app))
})

app.listen(3000, () => console.log('Server on!'))