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
functionSignatures.prototype.normalize = function normalize() {
  arguments = Array.prototype.slice.call(arguments, 0);

  for (var signature in this._signatures)
    if (this._signatures.hasOwnProperty(signature))
      if (this._signatures[signature].apply(this, arguments))
        return this.emit.apply(this, [signature].concat(arguments));

  var caller = normalize.caller;

  throw new Error("Invalid function signature for: " + caller.toString());
};

/**
 * Mixin
 */
Emitter(functionSignatures.prototype);

