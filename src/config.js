
//read the .env file
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT,
    windowTime: process.env.WINDOW_TIME,
    apiPrefix: process.env.API_PREFIX,
    fastify: {
        ignoreTrailingSlash: true,
        logger: {
            level: 'info',
            file: process.env.LOG_PATH
        },
        caseSensitive: false
    }
}