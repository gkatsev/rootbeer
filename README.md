# rootbeer

Streamy module that transforms a JSON stream into scss syntax Sass.

rootbeer converts JSON objects into Sass maps, which are supported in Ruby Sass 3.3 and libsass 2.0.

```
npm install rootbeer
```

## Why?

So you can share values between your scripts and stylesheets without having to use something like [SassyJSON](https://github.com/HugoGiraudel/SassyJSON), which doesn't work with libsass.

## Examples

Example source file `theme.json`:
```
{
  "string": "I am a string",
  "boolean": true,
  "number": 1.23,
  "array": [1, 2, 3],
  "object": {
    "foo": "bar"
  }
  "null": null
}

```

From the command-line:

```
$ json-sass -i theme.json -o theme.scss -p "\$theme: "
```

Output `theme.scss`:

```scss
$theme: (
  string: I am a string,
  boolean: true,
  number: 1.23,
  array: (1, 2, 3),
  object: (
    foo: bar
  ),
  null: null
);
```

Or you can use the Node API:

``` javascript
var fs = require('fs');
var rootbeer = require('rootbeer');

fs.createReadStream('theme.json')
  .pipe(rootbeer({
    prefix: '$theme: ',
  }))
  .pipe(fs.createWriteStream('theme.scss'));
```

Or with gulp using [vinyl-source-stream](https://github.com/hughsk/vinyl-source-stream):

```javascript
var gulp = require('gulp');
var rootbeer = require('json-sass');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('theme', function() {
  return fs.createReadStream('theme.json')
    .pipe(rootbeer({
      prefix: '$theme: ',
    }))
    .pipe(source('theme.json'))
    .pipe(rename('theme.scss'))
    .pipe(gulp.dest('./'));
});
```

You can also transform normal JavaScript values using the exposed utility function:

```javascript
rootbeer.convertJs([1, 2, 3]); // (1, 2, 3)
```

## API

### `rootbeer([opts])`

Returns a through stream. Available options:

- `prefix`: Add some text to the beginning
- `suffix`: Add some text to the end. Defaults to `';'`.

### `rootbeer.convertJs(jsValue)`

Convert a normal JavaScript value to its string representation in Sass. Ignores `undefined` and functions. Calls `.toString()` on non-plain object instances.

## json-sass
This was originally a fork from [Andrew Clark](http://twitter.com/acdlite)'s [json-sass](https://github.com/acdlite/json-sass/) project.

## Naming
This is called rootbeer because it's main ingredient is [sassafras](https://en.wikipedia.org/wiki/Sassafras#Culinary_uses_of_sassafras).

## License

MIT
