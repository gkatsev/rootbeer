import csscolors from 'css-color-names';

const names = Object.keys(csscolors);

export default function(value) {
  return (/^(?:#|rgba?|hsla?)/).test(value) || names.includes(value);
}
