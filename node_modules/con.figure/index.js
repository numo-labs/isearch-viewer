module.exports = function(input, options) {
  options = options || {}
  var config = input.common || {}
    , env = options.env || process.env.NODE_ENV
    , envConfig = input[env]

  if (!envConfig || typeof envConfig !== 'object') return config

  var keys = Object.keys(envConfig)
  var i = keys.length;
  while (i--) {
    config[keys[i]] = envConfig[keys[i]]
  }

  return config
}