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

router.post('/', async (req, res) => {
    const { cpf, password } = req.body

    const
        table = 'cadastro',
        filter = `where cpf = "${cpf}" and senha = MD5("${password}")`

    utilsDb.get({
        table,
        filter,
    }).then(({ rows }) => {
        rows.length == 1
            ? ok(res, { message: 'Login realizado com sucesso' } )
            : error(res, 'CPF ou senha inválidos.')
    })
    .catch(err => error(res, fail.query, err))
})

const exportRouter = [
    app => app.use('/auth', router)
]

export default exportRouter