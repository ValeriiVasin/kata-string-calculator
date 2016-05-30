export function add(numbers = '') {
  numbers = numbers.trim();

  if (numbers.length === 0) {
    return 0;
  }

  var formatted = numbers
    .replace('\n', ',')
    .split(',')
    .map(n => n.trim());

  if (formatted.length === 0) {
    return 0;
  }

  var formattedNonEmpty = formatted
    .filter(n => n !== '');

  if (formatted.length !== formattedNonEmpty.length) {
    throw new Error('Bad shit !');
  }

  return formattedNonEmpty
    .filter(n => n !== '')
    .map(Number)
    .reduce((acc, n) => acc + n, 0);
}
