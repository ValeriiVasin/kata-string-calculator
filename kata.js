export function add(...numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  return numbers
    .map(n => n.trim())
    .filter(n => n !== '')
    .map(Number)
    .reduce((acc, n) => acc + n, 0);
}
