import { exec } from '../database/db.js'
import { utilsDb } from '../database/utils.js'

const VERSION = '1.0.0'

class UtilsRoutes {
    async contractByToken(token) {
        const sql = `SELECT * FROM contrato WHERE token = '${token}'`
        return exec({ sql }).then(result => {
            if (!result.length) return false
            return result[0]
        }).catch(err => false)
    }
    
    error(res, message, error, status = 200) {
        return res.status(status).send({
            success: false,
            message,
            error,
            version: VERSION
        })
    }
    
    ok(res, { rows, message, total_results, total_pages, insertId, dt_cadastro, specific, status = 200 }) {
        if (rows && rows.length === undefined) rows = [rows]
        return res.status(status).send({
            success: true,
            message,
            insertId,
            dt_cadastro,
            total_results,
            total_pages,
            specific,
            rows,
            version: VERSION
        })
    }

    join({ type = 'left', table, tableJoined, conditioningCol }) {
        if (!type) return ''
        const on = `${table}.${conditioningCol} = ${tableJoined}.${conditioningCol}`
        return `${type.toUpperCase()} JOIN ${tableJoined} ON ${on}`
    }
}

export const utilsRoutes = new UtilsRoutes() 