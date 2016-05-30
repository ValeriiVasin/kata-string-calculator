import { add, parseInput, replaceMultiple } from '../kata';

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

  it('supports different delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  it('throw error if input contains negative numbers', () => {
    function fn() {
      add('1,-4');
    }

    expect(fn).toThrowError('negatives not allowed');
  });

  it('throw error if input contains negative numbers', () => {
    function fn() {
      add('//;\n-1;2;-4');
    }

    expect(fn).toThrowError('negatives not allowed: -1, -4');
  });

  it('filters numbers greater then 1000', () => {
    expect(add('2, 1000')).toBe(1002);
    expect(add('2, 1001')).toBe(2);
  });

  it('handles multi-character delimiters properly', () => {
    expect(add('//***\n1***2***3')).toBe(6);
  });

  it('handles few delimiters sytax properly', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
  });

  it('possible to set few multi-character delimiters', () => {
    expect(add('//[***][*+*]\n1***2*+*3')).toBe(6);
  });
});

describe('multi delimiter replacer', () => {
  it('replaces one delimiter correctly', () => {
    expect(replaceMultiple('123;456;789', ';', 'h')).toEqual('123h456h789');
  });

  it('replaces few delimiters correctly', () => {
    expect(replaceMultiple('123;456%789', [';', '%'], 'h')).toBe('123h456h789');
  });
});

describe('parse input', () => {
  it('parses input without delimiters correctly', () => {
    expect(parseInput('123')).toEqual({ input: '123', delimiters: [] });
  });

  it('parses input with single delimiter correctly', () => {
    expect(parseInput('//;\n123')).toEqual({ input: '123', delimiters: [';'] });
  });

  it('parses input with single multi-character delimiter correctly', () => {
    expect(parseInput('//xyz\n123')).toEqual({ input: '123', delimiters: ['xyz'] });
  });

  it('parses input with multiple delimiters correctly', () => {
    expect(parseInput('//[x][y]\n123')).toEqual({ input: '123', delimiters: ['x', 'y'] });
  });

  it('parses input with multiple multi-character delimiters correctly', () => {
    expect(parseInput('//[xyz][abc]\n123')).toEqual({ input: '123', delimiters: ['xyz', 'abc'] });
  });

  it('trims parsed input (single delimiter)', () => {
    expect(parseInput('//;\n 123 ')).toEqual({ input: '123', delimiters: [';'] })
  });

  it('trims parsed input (multi delimiters)', () => {
    expect(parseInput('//[;][&]\n 123 ')).toEqual({ input: '123', delimiters: [';', '&'] })
  });
});
