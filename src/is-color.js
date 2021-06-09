export default function(value) {
  return (/^(?:#|rgba?|hsla?)/).test(value);
}
