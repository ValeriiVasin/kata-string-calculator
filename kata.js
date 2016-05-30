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

  var formattedNumbers = formattedNonEmpty
    .filter(n => n !== '')
    .map(Number);

  var formattedNegativeNumbers = formattedNumbers.filter(n => n < 0);

  if (formattedNegativeNumbers.length === 1) {
    throw new Error('negatives not allowed');
  }

  if (formattedNegativeNumbers.length > 1) {
    throw new Error('negatives not allowed: ' + formattedNegativeNumbers.join(', '));
  }

  return formattedNumbers
    .reduce((acc, n) => acc + n, 0);
}
