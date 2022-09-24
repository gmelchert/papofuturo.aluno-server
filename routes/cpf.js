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
        cpf = req.params.cpf.replaceAll('.', '').replace('-', ''),
        table = 'cadastro',
        specificfiltersObjects = { cpf, admin: 0 },
        filter = { req, table, specificfiltersObjects }

    utilsDb.get({
        table,
        filter
    }).then(result => ok(res, result))
    .catch(err => error(res, fail.query, err))
})

router.post('', async (req, res) => {
    const {
        cpf,
        rg,
        fone,
        email,
        idade,
        sobrenome,
        nome,
        confirmarSenha,
        senha
    } = req.body

    if (confirmarSenha !== senha) return error(res, 'As senhas estão diferentes.')

    if (Object.values(req.body).some(val => !val)) return error(res, 'Todos os campos são obrigatórios.')
    const
        table = 'cadastro',
        values = {
            cpf: cpf.replaceAll('.', '').replace('-', ''),
            rg,
            fone,
            email,
            idade,
            sobrenome,
            nome,
            senha
        },
        md5Values = ['senha']

    utilsDb.post({
        table,
        values,
        md5Values
    }).then(result => ok(res, result))
    .catch(err => error(res, fail.query, err))
})

const exportRouter = [
    app => app.use('/cpf', router)
]

export default exportRouter