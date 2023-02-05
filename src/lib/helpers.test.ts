import { AgeRanges } from "../types/account";
import { getAgeRange, getGenderAgeRangeString } from "./helpers"

describe('testing helper functions', () => {
  test('getAgeRange | returns the correct age range', () => {
    const age = 20;
    expect(getAgeRange(age)).toBe(AgeRanges.AGES_19_30);
  });
  
  test('getAgeRange | returns the correct age range if the input is a string', () => {
    const age = '43';
    expect(getAgeRange(age)).toBe(AgeRanges.AGES_31_50);
  });

  test('getAgeRange | returns 19-30 age range if the input is undefined or incorrect', () => {
    const age = undefined;
    expect(getAgeRange(age)).toBe(AgeRanges.AGES_19_30);
  });

  test('getGenderAgeRange | input with undefined gender and defined age returns female + the age range', () => {
    const age = 56;
    const gender = undefined;
    expect(getGenderAgeRangeString(gender, age)).toBe(`female_${AgeRanges.AGES_51_PLUS}`);
  });

  test('getGenderAgeRange | input with defined gender and undefined age returns the gender + age range 19-30', () => {
    const age = undefined;
    const gender = 'male';
    expect(getGenderAgeRangeString(gender, age)).toBe(`${gender}_${AgeRanges.AGES_19_30}`);
  });

  test('getGenderAgeRange | input with undefined gender and undefined age returns female + age range 19-30', () => {
    const age = undefined;
    const gender = undefined;
    expect(getGenderAgeRangeString(gender, age)).toBe(`female_${AgeRanges.AGES_19_30}`);
  });

  test('getGenderAgeRange | input with defined gender and defined age returns inputted gender + age range', () => {
    const age = 12;
    const gender = 'male';
    expect(getGenderAgeRangeString(gender, age)).toBe(`${gender}_${getAgeRange(age)}`);
  });

})