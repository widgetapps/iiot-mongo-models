var expect = require('expect.js'),
    terepacModels = require('..');

describe('terepac-models', function() {
  it('should say hello', function(done) {
    expect(terepacModels()).to.equal('Hello, world');
    done();
  });
});
