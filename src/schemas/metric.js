'use strict'

const postMetric = {
    body: {
      type: 'object',
      properties: {
        value: { type: 'integer' }
      }
    },
    params: {
        type: 'object',
        properties: {
          metric: { type: 'string' }
        }
      }
  }
  
  const findMedian = {
    params: {
      type: 'object',
      properties: {
        metric: { type: 'string' }
      }
    }
  }
  
  const deleteMetric = {
    params: {
      type: 'object',
      properties: {
        metric: { type: 'string' }
      }
    }
  }

  module.exports = { postMetric, findMedian, deleteMetric }