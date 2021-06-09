'use strict';

import through from 'through2';
import jsToSassString from './jsToSassString';
import assign from 'object.assign';

let DEFAULTS = {
  prefix: '',
  suffix: ';',
};

function rootbeer(options) {
  let settings = assign({}, DEFAULTS, options);

  return through(function(chunk, enc, callback) {
    let jsValue;
    try {
      jsValue = JSON.parse(chunk);
    }
    catch (err) {
      return callback(err);
    }
    let sassString = jsToSassString(jsValue);
    sassString = settings.prefix + sassString + settings.suffix;
    this.push(sassString);
    callback();
  });
}

rootbeer.convertJs = jsToSassString;
export default rootbeer;
