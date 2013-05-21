/**
 * Dependencies
 */
var Emitter = require('emitter');

/**
 * Expose
 */
module.exports = functionSignatures;

/**
 * Constructor
 */
function functionSignatures(signatures) {
  this._signatures = signatures;
};

/**
 * Prototype
 */
functionSignatures.prototype.normalize = function() {
  arguments = Array.prototype.slice.call(arguments, 0);

  for (var signature in this._signatures)
    if (this._signatures.hasOwnProperty(signature))
      if (this._signatures[signature].apply(this, arguments))
        return this.emit.apply(this, [signature].concat(arguments));
};

/**
 * Mixin
 */
Emitter(functionSignatures.prototype);

