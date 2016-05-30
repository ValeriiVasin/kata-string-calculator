export function add(numbers = '') {
  const delimiterRegexp = /\/\/(.*?)\n(.*)/;
  let delimiter = ',';

  if (delimiterRegexp.test(numbers)) {
    let [, newDelimiter, newInput] = numbers.match(delimiterRegexp);
    delimiter = newDelimiter;
    numbers = newInput;
  }

  numbers = numbers.trim();

  if (numbers.length === 0) {
    return 0;
  }

  var formatted = numbers
    .replace('\n', delimiter)
    .split(delimiter)
    .map(n => n.trim());

  if (formatted.length === 0) {
    return 0;
  }

  var formattedNonEmpty = formatted
    .filter(n => n !== '');

  if (formatted.length !== formattedNonEmpty.length) {
    throw new Error('delimiters messed up');
  }

  return formattedNonEmpty
    .filter(n => n !== '')
    .map(Number)
    .reduce((acc, n) => acc + n, 0);
}
