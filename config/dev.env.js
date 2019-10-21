'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://61.164.87.62:8843"',
   BASE_API: '"http://localhost:8843"',
  //BASE_API: '"http://101.132.138.61:8843"',
})
