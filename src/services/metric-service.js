
const cache = require('../utils/cache')
const config = require('../config')

const postMetric = function (req, instance) {
    var metric = req.params.metric;
    var value = req.body.value;
    var startTime = instance.timestamp()
    var metricArray = []
    var newWindow = {}
    var isactive = false;
    try {
        if (!cache.has(metric)) {
            newWindow.time = instance.timestamp()
            newWindow.avg = value;
            newWindow.isActive = true;
            newWindow.count = 1;

            metricArray.push(newWindow)
            isactive = true;
        } else {
            metricArray = cache.get(metric);
            metricArray.map(function (obj) {
                if (obj.isActive === true) {
                    isactive = true
                    var timeDiff = (startTime - obj.time) / 1000;
                    if (timeDiff > config.windowTime) {
                        obj.isActive = false;
                        newWindow.time = instance.timestamp()
                        newWindow.avg = value;
                        newWindow.isActive = true;
                        newWindow.count = 1;

                        metricArray.push(newWindow)
                    } else {
                        var avg = obj.avg * (obj.count) / (obj.count + 1) + value / (obj.count + 1);
                        obj.avg = avg;
                        obj.count = obj.count + 1;

                    }
                }
            });
        }
        if (!isactive) {
            newWindow.time = instance.timestamp()
            newWindow.avg = value;
            newWindow.isActive = true;
            newWindow.count = 1;

            metricArray.push(newWindow)
        }
        cache.set(metric, metricArray)
    } catch (err) {
        req.log.error(err)
    }
    return cache.get(metric)
}

const getMedian = function (req, instance) {
    var metric = req.params.metric;
    var startTime = instance.timestamp()
    var metricArray = []
    var median = 0;
    let subArray = []
    try {
        if (cache.has(metric)) {
            metricArray = cache.get(metric);
            var windowLength = 0;
            var lastMetric = metricArray[metricArray.length - 1]
            if (lastMetric.isActive == true) {
                var timeDiff = (startTime - lastMetric.time) / 1000;
                if (timeDiff > config.windowTime) {
                    lastMetric.isActive = false
                    windowLength = metricArray.length;
                    subArray = metricArray
                } else {
                    windowLength = metricArray.length - 1;
                    subArray = metricArray.slice(0, windowLength)
                }
            } else {
                windowLength = metricArray.length;
                subArray = metricArray
            }
            subArray.sort(sortByProperty("avg"));
            if (windowLength != 0) {
                if (windowLength % 2 == 0) {
                    median = subArray[(windowLength / 2 - 1)].avg
                } else {
                    median = subArray[parseInt(windowLength / 2)].avg
                }
            }

        }
    } catch (err) {
        req.log.error(err)
    }
    return median
}

const delMetric = function (req, instance) {
    var metric = req.params.metric;
    var startTime = instance.timestamp()
    var metricArray = []
    try {
        if (cache.has(metric)) {
            metricArray = cache.get(metric);
            var lastMetric = metricArray[metricArray.length - 1]
            if (lastMetric.isActive == true) {
                var timeDiff = (startTime - lastMetric.time) / 1000;
                if (timeDiff > config.windowTime) {
                    lastMetric.isActive = false
                    metricArray.splice(0, metricArray.length)
                } else {
                    metricArray.splice(0, metricArray.length - 1)
                }
            } else {
                metricArray.splice(0, metricArray.length)
            }
        }
    } catch (err) {
        req.log.error(err)
    }
    return cache.get(metric)
}

function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

module.exports = {
    postMetric,
    getMedian,
    delMetric
};