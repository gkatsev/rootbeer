'use strict';

import isPlainObject from 'lodash.isplainobject';
import isColor from './is-color.js';
let { isArray } = Array;

function jsToSassString(value) {

  function _jsToSassString(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return quoteString(strEsc(value));
      case 'object':
        if (isPlainObject(value)) {
          indentLevel += 1;
          let indent = indentsToSpaces(indentLevel);

          let jsObj = value;
          let sassKeyValPairs = [];

          sassKeyValPairs = Object.keys(jsObj)
            .reduce((result, key) => {
              let jsVal = jsObj[key];
              let sassVal = _jsToSassString(jsVal, indentLevel);

              if (isNotUndefined(sassVal)) {
                result.push(`"${key}": ${sassVal}`);
              }

              return result;
            }, []);

          let result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
          indentLevel -= 1;
          return result;
        }
        else if (isArray(value)) {
          let sassVals = value.map((v) => isNotUndefined(v) ?
            _jsToSassString(v, indentLevel) :
            null)
            .filter((v) => v !== null);

          return '(' + sassVals.join(', ') + ')';
        }
        else if (isNull(value)) return 'null';
        else return value.toString();
      default:
        return;
    }
  }

  return _jsToSassString(value);
}

function quoteString(value) {
  if (isColor(value)) {
    return value;
  }

  return `"${value}"`;
}

function indentsToSpaces(indentCount) {
  return Array(indentCount + 1).join('  ');
}

function isNull(value) {
  return value === null;
}

function isNotUndefined(value) {
  return typeof value !== 'undefined';
}

function strEsc(value) {
  return value.replace(/"/g, "\\\"");
}

export default jsToSassString;
