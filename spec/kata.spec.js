import { add } from '../kata';

describe('kata', () => {
  it('returns zero if none arguments provided', () => {
    expect(add()).toBe(0);
  });

  it('return zero if empty string provided', () => {
    expect(add('')).toBe(0);
  });

  it('works for one number', () => {
    expect(add('123')).toBe(123);
  });

  it('works for empty strings in input', () => {
    expect(add('1, 123')).toBe(124);
  });

  it('works for untrimmed input', () => {
    expect(add('1,     123   ')).toBe(124);
  });

  it('works when \\n is used instead of comma', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  it('does not work when two delimiters next to each other', () => {
    function fn() {
      add('1,\n');
    }

    expect(fn).toThrow();
  });
});
