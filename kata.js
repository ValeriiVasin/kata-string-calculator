export function add(numbers = '') {
  return numbers
    .replace('\n', ',')
    .split(',')
    .map(n => n.trim())
    .filter(n => n !== '')
    .map(Number)
    .reduce((acc, n) => acc + n, 0);
}
