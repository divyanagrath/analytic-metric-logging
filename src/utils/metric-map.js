const metricMap = new Map();

module.exports = {
    has(key) {
      return metricMap.has(key)
    },
  
    set(key, value) {
      return metricMap.set(key, [value, Date.now()])
    },
  
    get(key) {
      return metricMap.get(key)[0]
    },
  
    delete(key) {
      return metricMap.delete(key)
    },
  
    clear() {
      return metricMap.clear()
    },
  }