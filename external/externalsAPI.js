import axios from "axios"

export default class API {
    constructor({ url, method = 'GET', body, params, headers }) {
        this.query = params ? `?${new URLSearchParams(params)}` : ''
        this.url = url
        this.method = method
        this.data = body
        this.headers = headers
    }

    async exec() {
        const 
            url = this.url + this.query,
            method = this.method,
            data = this.data

        const config = {
            method,
            url,
            headers: { 
                'Content-Type': 'application/json',
                ...this.headers
            },
            data
        }
            
        return axios(config)
            .then(response => response.data)
            .catch(err => false)
    }

    async result() {
        return await this.exec()
    }
}