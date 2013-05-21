var assert = require('assert'),
    functionSignatures = require('function-signatures'),
    prototype = functionSignatures.prototype;

describe('functionSignatures', function() {
  it('should be a function', function() {
    assert(typeof functionSignatures === 'function');
  });

  describe('the prototype', function() {
    it('should have a `normalize` function', function() {
      assert(typeof prototype.normalize === 'function');
    });
  });
});
