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

  const splitted = splitBy(input, delimiters).map(n => n.trim());

  if (splitted.length === 0) {
    return 0;
  }

  const splittedNonEmpty = splitted.filter(n => n !== '');

  if (splitted.length !== splittedNonEmpty.length) {
    throw new Error('delimiters messed up');
  }

  const numbers = splittedNonEmpty.map(Number);

  // handle negative numbers
  const negativeNumbers = numbers.filter(n => n < 0);

  if (negativeNumbers.length === 1) {
    throw new Error('negatives not allowed');
  }

  if (negativeNumbers.length > 1) {
    throw new Error('negatives not allowed: ' + negativeNumbers.join(', '));
  }

  return numbers
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

/**
 * Splits string by one or few delimiters
 */
export function splitBy(str, delimiters) {
  const SECRET_DELIMITER = '__SECRET_DELIMITER__';

  if (!Array.isArray(delimiters)) {
    delimiters = [delimiters];
  }

  return replaceMultiple(str, delimiters, SECRET_DELIMITER).split(SECRET_DELIMITER)
}
