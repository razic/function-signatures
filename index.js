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
function functionSignatures(_signatures) {
  if (arguments.length !== 1)
    throw new Error('You must pass exactly one object');

  if (arguments.length === 1)
    for (var signature in _signatures)
      if (_signatures.hasOwnProperty(signature))
        if (typeof _signatures[signature] !== 'function')
          throw new Error("Property `" + signature + "` is not a function");

  this._signatures = _signatures;
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
