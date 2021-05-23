'use strict'
const config = require('./config')
const AutoLoad = require('fastify-autoload')

const fastify = require('fastify')(config.fastify)
const path = require('path')

module.exports = fastify;
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({})
})
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({ prefix: config.apiPrefix })
})

fastify.listen(config.port, '0.0.0.0', (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(0)
    }
    console.log(`Server listening on ${address}`)
})