'use strict'

const schemas = require('../schemas/metric')
const metricController = require('../controllers/metric-controller');

module.exports = function (fastify, opts, next) {
    fastify.post('/:metric',
        { schema: schemas.postMetric },
        async (req, reply) => {
            const result = metricController.postMetric(req, reply, fastify)
            reply.send({ result: 'success', metric: result })

        })

    fastify.get('/:metric/median',
        { schema: schemas.findMedian },
        async (req, reply) => {
            const result = metricController.getMedian(req, reply, fastify)
            reply.send({ "median": result })

        })

    fastify.delete('/:metric',
        { schema: schemas.deleteMetric },
        async (req, reply) => {
            const result = metricController.delMetric(req, reply, fastify)
            reply.send({ metric: result })

        })

    next()
}