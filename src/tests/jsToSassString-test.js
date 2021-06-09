'use strict';

import { expect } from 'chai';
import jsToSassString from '../jsToSassString';

function Foo() {
  this.toString = function() {
    return 'bar';
  }
}

var foo = new Foo();

describe('JS to Sass', function() {
  it('should handle strings', function() {
    expect(jsToSassString('foo')).to.equal('"foo"');
  });

  // https://sass-lang.com/documentation/values/colors
  it('should handle colors', function() {
    expect(jsToSassString('foo')).to.equal('"foo"');
    expect(jsToSassString('#f2ece4')).to.equal('"#f2ece4"');
    expect(jsToSassString('#b37399aa')).to.equal('"#b37399aa"');
    expect(jsToSassString('rgb(204, 102, 153)')).to.equal('"rgb(204, 102, 153)"');
    expect(jsToSassString('rgba(107, 133, 127, 0.8)')).to.equal('"rgba(107, 133, 127, 0.8)"');
    expect(jsToSassString('hsl(228, 7%, 86%)')).to.equal('"hsl(228, 7%, 86%)"');
    expect(jsToSassString('hsla(20, 20%, 85%, 0.7)')).to.equal('"hsla(20, 20%, 85%, 0.7)"');
  });

  it('should handle booleans', function() {
    expect(jsToSassString(true)).to.equal('true');
    expect(jsToSassString(false)).to.equal('false');
  });

  it('should handle null', function() {
    expect(jsToSassString(null)).to.equal('null');
  });

  it('should ignore undefined', function() {
    expect(jsToSassString(undefined)).to.be.undefined;
  });

  it('should ignore functions', function() {
    expect(jsToSassString(function() {})).to.be.undefined;
  });

  it ('should use value of `.toString()` for non-plain objects', function() {
    expect(jsToSassString(foo)).to.equal('bar');
  });

  it('should convert arrays to lists', function() {
    expect(jsToSassString([1, 2, 3])).to.equal('(1, 2, 3)');
  });

  it('should work with escaped quotes and sass operators', function() {
    let s = "foo=\"bar\",baz=\"*null\"";
    expect(jsToSassString(s)).to.equal("\"foo=\\\"bar\\\",baz=\\\"*null\\\"\"");
  });

  it('should convert objects to maps, with indentation', function() {
    var obj = {
      foo: 'bar',
      bar: {
        baz: 'foo',
      },
    };

    expect(jsToSassString(obj)).to.equal('(\n  "foo": "bar",\n  "bar": (\n    "baz": "foo"\n  )\n)')
  })
});
