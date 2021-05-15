const metricService = require('../services/metric-service');

const postMetric = function(req, res, instance){
    return metricService.postMetric(req, instance)
}

const getMedian = function(req, res, instance){
    return metricService.getMedian(req, instance)
}

const delMetric = function(req, res, instance){
    return metricService.delMetric(req, instance)
}

module.exports = {
    postMetric,
    getMedian,
    delMetric
};