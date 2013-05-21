var assert = require('assert'),
    functionSignatures = require('function-signatures');

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

  it("should throw an error if you didn't pass arguments properly", function() {
    var errorMessage;

    try {
      new functionSignatures({ 'foo': 'bar' });
    } catch (error) {
      errorMessage = error.message;
    }

    assert(errorMessage === "Property `foo` is not a function");
  });

  describe('.normalize(arguments)', function() {
    var emits,
        signatures,
        implementer,
        signatureArguments,
        eventHandlerContext,
        eventHandlerArguments;

    beforeEach(function() {
      emits = [];
      signatureArguments = null;
      eventHandlerContext = null;
      eventHandlerArguments = null;

      signatures = new functionSignatures({
        "one object": function() {
          signatureArguments = arguments;
          return arguments.length === 1;
        },
        "duplicate of the above": function() {
          signatureArguments = arguments;
          return arguments.length === 1;
        },
        "two objects": function() {
          signatureArguments = arguments;
          return arguments.length === 2;
        }
      });

      signatures.on("one object", function() {
        eventHandlerContext = this;
        eventHandlerArguments = arguments;
        emits.unshift('one object');
      });

      signatures.on("duplicate of the above", function() {
        eventHandlerContext = this;
        eventHandlerArguments = arguments;
        emits.unshift('duplicate of the above');
      });

      signatures.on("two objects", function() {
        eventHandlerContext = this;
        eventHandlerArguments = arguments;
        emits.unshift('two objects');
      });

      implementer = function implementer() {
        signatures.normalize(arguments);
      };
    });

    it('should throw an error if passed an invalid signature', function() {
      var errorMessage;

      try {
        implementer({}, {}, {});
      } catch (error) {
        errorMessage = error.message;
      }

      var msg = 'Invalid signature for: ' + implementer.toString();

      assert(errorMessage === msg);
    });

    it('should only emit the first signature that returns true', function() {
      implementer({});

      assert(emits.length === 1);
      assert(emits[0] === "one object");
    });

    it('should pass arguments to the signature properly', function() {
      implementer('foo', 'bar');

      assert(signatureArguments[0] === 'foo');
      assert(signatureArguments[1] === 'bar');
    });

    it('should pass arguments to the event handler properly', function() {
      implementer('foo', 'bar');

      assert(eventHandlerArguments[0] === 'foo');
      assert(eventHandlerArguments[1] === 'bar');
    });

    it('should change the context of the event handler', function() {
      implementer('foo', 'bar');

      console.log(eventHandlerContext);
      assert(eventHandlerContext === signatures);
    });
  });
});
