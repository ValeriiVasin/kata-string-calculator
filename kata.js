export function add(numbers = '') {
  const delimiterRegexp = /\/\/(.*?)\n(.*)/;
  // const multiDelimiterRegexp = //;
  let delimiters = ',';

  if (delimiterRegexp.test(numbers)) {
    let [, newDelimiter, newInput] = numbers.match(delimiterRegexp);
    delimiters = [newDelimiter];
    numbers = newInput;
  }

  numbers = numbers.trim();

  if (numbers.length === 0) {
    return 0;
  }

  // add \n to delimiters
  delimiters = [...delimiters, '\n'];
  const SUPER_DELIMITER = '__SUPER_DELIMITER__';

  var formatted = replaceMultiple(numbers, delimiters, SUPER_DELIMITER)
    .split(SUPER_DELIMITER)
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
    .filter(n => n <= 1000)
    .reduce((acc, n) => acc + n, 0);
}

export function replaceMultiple(str, substrings, replaceWith) {
  if (!Array.isArray(substrings)) {
    substrings = [substrings];
  }

  return substrings.reduce((str, substring) => {
    let prevResult;
    let result = str;

    do {
      prevResult = result;
      result = result.replace(substring, replaceWith);
    } while (prevResult !== result);

    return result;
  }, str);
}
