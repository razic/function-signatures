var assert = require('assert'),
    functionSignatures = require('function-signatures');

describe('functionSignatures', function() {
  it('should be a function', function() {
    assert(typeof functionSignatures === 'function');
  });

  describe('the prototype', function() {
    var prototype = functionSignatures.prototype;
    it('should have a `normalize` function', function() {
      assert(typeof prototype.normalize === 'function');
    });
  });
});
