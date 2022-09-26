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
        sobrenome,
        nome,
        confirmarsenha,
        senha,
        numero,
        bairro,
        logradouro,
        complemento,
        dt_nasc
    } = req.body

    const keys = Object.keys(req.body)

    if (confirmarsenha !== senha) return error(res, 'As senhas estão diferentes.')

    const canBeNull = ['bairro', 'complemento']

    if (Object.values(req.body).filter((val, index) => !canBeNull.includes(keys[index])).some(val => !val)) return error(res, 'Todos os campos são obrigatórios.')
    const
        table = 'cadastro',
        values = {
            cpf,
            rg,
            fone,
            email,
            sobrenome,
            nome,
            senha,
            admin: 0,
            numero,
            bairro,
            logradouro,
            complemento,
            dt_nasc
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