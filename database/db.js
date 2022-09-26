import mysql from 'mysql2'
import dbAdmin from './config.js'

async function connect(config) {
    if (global.connection && global.connection.state !== 'disconnected') return global.connection
    try {
        const connection = mysql.createConnection(config)
        global.connect = connection
        return connection
    } catch (err) {
        return false
    }
}

async function exec({ sql, values }) {
    console.log(sql)
    return new Promise(async (resolve, reject) => {
        const conn = await connect(dbAdmin)
        if (!conn) return reject('Não conectou ao banco.')

        values
            ? conn.query(sql, values, (err, res) => {
                conn.end()
                if (err) reject(err)
                resolve(res)
            })
        
            : conn.query(sql, (err, res) => {
                conn.end()
                if (err) reject(err)
                if (!res || !res.length) resolve([])
                resolve(res)
            })
    })
}

export {
    exec
}