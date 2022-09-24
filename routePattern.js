import express from "express"
import { utilsDb } from "../database/utils.js"
import { utilsRoutes } from './utils.js'
import { erp } from "../external/integration.js"
import API from '../external/externalsAPI.js'
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

router.get('/', async (req, res) => {
    const
        limit = req.query.page_limit || 20,
        table = '', 
        pagination = { req, limit },
        include = [{ col: '', table: '' }],
        specificfiltersObjects = {},
        filter = { req, table, specificfiltersObjects }

    utilsDb.get({
        table,
        filter,
        pagination,
        include,

    }).then(result => ok(res, result))
    .catch(err => error(res, fail.query, err))
})

const exportRouter = [
    app => app.use('/', router)
]

export default exportRouter