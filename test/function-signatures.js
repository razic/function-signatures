var assert = require('assert'),
    functionSignatures = require('function-signatures'),
    prototype = functionSignatures.prototype,
    object = {
      "one object": function() { return arguments.length === 1; },
      "duplicate of above": function() { return arguments.length === 1; },
      "two objects": function() { return arguments.length === 2; }
    },
    signatures = new functionSignatures(object);

describe('functionSignatures', function() {
  it('should be a function', function() {
    assert(typeof functionSignatures === 'function');
  });

  describe('new functionSignatures(object)', function() {
    it("should throw an error if you didn't pass any arguments", function() {
      var errorMessage;

      try {
        new functionSignatures();
      } catch (error) {
        errorMessage = error.message;
      }

      assert(errorMessage === "You must pass exactly one object");
    });

    it("should throw an error if you didn't pass arguments proper", function() {
      var errorMessage;

      try {
        new functionSignatures({ 'foo': 'bar' });
      } catch (error) {
        errorMessage = error.message;
      }

      assert(errorMessage === "Property `foo` is not a function");
    });

    it('should set `_signatures` property to be the object passed', function() {
      assert(signatures._signatures === object);
    });

    describe('.normalize(arguments)', function() {
      it('should throw an error if passed an invalid signature', function() {
        var errorMessage;

        try {
          function someFunc() { signatures.normalize({}, {}, {}); };
          someFunc();
        } catch (error) {
          errorMessage = error.message;
        }

        var expected = 'Invalid function signature for: ' + someFunc.toString();

        assert(errorMessage === expected);
      });

      it('should only emit the first signature that returns true', function() {
        var emits = [];

        signatures.on('one object', function() {
          emits.unshift('one object');
        });

        signatures.on('duplicate of above', function() {
          emits.unshift('duplicate of above');
        });

        signatures.normalize({});
        signatures.off();

        assert(emits.length === 1);
        assert(emits[0] === "one object");
      });

      it('should pass arguments to the event handler properly', function() {
        var args;

        signatures.on('two objects', function() { args = arguments; });
        signatures.normalize('foo', 'bar');
        signatures.off();

        assert(args[0] === 'foo');
        assert(args[1] === 'bar');
      });

      it('should change the context of the event handler', function() {
        var context;

        signatures.on('two objects', function() { context = this; });
        signatures.normalize('foo', 'bar');
        signatures.off();

        assert(context === signatures);
      });
    });
  });
});
