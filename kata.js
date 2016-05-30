export function add(input) {
  if (typeof input === 'undefined') {
    return 0;
  }

  const parsedResult = parseInput(input);

  input = parsedResult.input;
  let delimiters = parsedResult.delimiters.length ? parsedResult.delimiters : [','];

  if (input.length === 0) {
    return 0;
  }

  // add \n to delimiters
  delimiters = [...delimiters, '\n'];
  const SUPER_DELIMITER = '__SUPER_DELIMITER__';

  var formatted = replaceMultiple(input, delimiters, SUPER_DELIMITER)
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

/**
 * Parse input and return real input and delimiters
 */
export function parseInput(input) {
  const delimiterRegexp = /\/\/(.*?)\n(.*)/;
  const multiDelimiterRegexp = /\[(.*?)\]/g;

  // string withou delimiter syntax
  if (!delimiterRegexp.test(input)) {
    return { input: input.trim(), delimiters: [] };
  }

  let [, delimitersStr, realInput] = input.match(delimiterRegexp);


  // multi delimiter case
  let multiDelimiters = [];
  let results;

  // eslint-disable-next-line
  while (results = multiDelimiterRegexp.exec(delimitersStr)) {
    multiDelimiters = [...multiDelimiters, results[1]];
  }

  return {
    input: realInput.trim(),
    delimiters: multiDelimiters.length ? multiDelimiters : [delimitersStr]
  };
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
