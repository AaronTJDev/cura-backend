import { AgeRanges } from "../types/account";
import {
  getAgeRange,
  getFilterString,
  getGenderAgeRangeString,
  getPaginationString
} from "./helpers"

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

  test('getPaginationString | input that is undefined returns an empty string', () => {
    expect(getPaginationString(undefined)).toBe('');
  });

  test('getPaginationString | input with pageNumber defined and pageOffset undefined returns pageNumber * DEFAULT_NUMBER_OF_ITEMS_PER_PAGE', () => {
    expect(getPaginationString(5)).toBe('SKIP 125');
  });

  test('getPaginationString | input with pageNumber defined and pageOffset defined returns pageNumber * pageOffset', () => {
    expect(getPaginationString(5, 10)).toBe('SKIP 50');
  });

  test('getFilterString | input with a falsy value returns an empty string', () => {
    expect(getFilterString(undefined)).toBe('');
  });

  test('getFilterString | input with a single item array returns a string formatted like an array', () => {
    const filterValues = ['hello'];
    expect(getFilterString(filterValues)).toBe('["hello"]');
  });

  test('getFilterString | input with a multi item array returns a string formatted like an multi-item array', () => {
    const filterValues = ['hello', 'world'];
    expect(getFilterString(filterValues)).toBe('["hello", "world"]');
  });
})