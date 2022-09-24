import express from "express"
import { utilsDb } from "../database/utils.js"
import { utilsRoutes } from './utils.js'
import messages from './utilsMessages.js'

const {
    fail,
    success
} = messages

const {
    ok,
    error
} = utilsRoutes

const router = express.Router()

router.get('/:cpf', async (req, res) => {
    const
        cpf = req.params.cpf,
        table = 'cadastro',
        specificfiltersObjects = { cpf },
        filter = { req, table, specificfiltersObjects }

    utilsDb.get({
        table,
        filter
    }).then(result => ok(res, result))
    .catch(err => error(res, fail.query, err))
})

const exportRouter = [
    app => app.use('/cpf', router)
]

export default exportRouter