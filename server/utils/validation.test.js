const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var str = 1235465;
    var result = isRealString(str);

    expect(result).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var str = '       ';
    var result = isRealString(str);

    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var str = 'fafjfkwj kfjan kajfn';
    var result = isRealString(str);

    expect(result).toBe(true);
  });
});
