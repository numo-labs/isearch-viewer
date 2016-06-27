// overreide node enviroment for testing.
process.env.NODE_ENV = 'development'

var settings = require('./fixtures/config.json')
  , should = require('should')
  , config = require('../index')(settings)

describe('Configure', function() {
  describe('#development', function() {
    it('should have the correct enviroment varible set', function() {
      process.env.NODE_ENV.should.equal('development')
    })

    it('should return an object', function() {
      config.should.be.a('object')
    })

    it('should contain the hash of log set to true', function() {
      should.exist(config.log)
    })
  })
})
