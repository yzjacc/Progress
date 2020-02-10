import { abs, add } from '@/count';

describe('abs函数', () => {
  it('测试给abs传入正数，期待返回值与输入相同', () => {
    expect(abs(1)).toBe(1);
  });
  
  it('测试给abs传入负数，期待返回值与输入相反', () => {
    expect(abs(-1)).toBe(1);
  });
  
  it('测试给abs传入0，期待返回值为0', () => {
    expect(abs(0)).toBe(0);
  });
  
  it('测试给abs传入非数值，期待返回值为NaN', () => {
    expect(abs("")).toEqual(NaN);
    expect(abs(true)).toEqual(NaN);
    expect(abs(null)).toEqual(NaN);
    expect(abs(undefined)).toEqual(NaN);
    expect(abs([])).toEqual(NaN);
    expect(abs({})).toEqual(NaN);
  });
})

describe('add函数', () => {
  it('测试add函数求和', () => {
    expect(add(1, 2, 3, 4)).toBe(10);
  })
})