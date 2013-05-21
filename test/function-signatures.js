var assert = require('assert'),
    functionSignatures = require('function-signatures');

describe('functionSignatures', function() {
  it('should be a function', function() {
    assert(typeof functionSignatures === 'function');
  });
});
