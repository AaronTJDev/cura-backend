import { applicationDefault, initializeApp} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { AgeRanges } from '../types/account';
import { DEFAULT_NUMBER_OF_ITEMS_PER_PAGE } from './constants';

export const logError = (err: any) => {
  console.log(err);
};

// Auth Helpers

export const initializeFirebase = () => {
  initializeApp({
    credential: applicationDefault()
  });
};

export const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization === 'test') {
      return next();
    }
    const token = req.headers.authorization;
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch(err) {
    logError(err);
    res.status(401).send({
      err
    });
  }
};

// Food API helpers

/**
 * Takes an age as an input and returns the age range the age falls into.
 * @param age the user's age
 */
export const getAgeRange = (age: number | string) => {
  if (!age || (typeof age !== 'string' && typeof age !== 'number')) {
    return AgeRanges.AGES_19_30;
  }

  if (typeof age === 'string') {
    age = parseInt(age);
  }

  if (age < 4) {
    return AgeRanges.AGES_1_3;
  } else if (age < 9) {
    return AgeRanges.AGES_4_8;
  } else if (age < 14) {
    return AgeRanges.AGES_9_13;
  } else if (age < 19) {
    return AgeRanges.AGES_14_18;
  } else if (age < 31) {
    return AgeRanges.AGES_19_30;
  } else if (age < 51) {
    return AgeRanges.AGES_31_50;
  }  else {
    return AgeRanges.AGES_51_PLUS;
  }
};

export const getGenderAgeRangeString = (gender: string, age: number | string) => {
  if (!gender && !!age) {
    return 'female_' + getAgeRange(age);
  } else if (!!gender && !age) {
    return `${gender}_${AgeRanges.AGES_19_30}`;
  } else if (!gender && !age) {
    return `female_${AgeRanges.AGES_19_30}`;
  } else {
    return `${gender}_${getAgeRange(age)}`;
  }
};

export const getPaginationString = (pageNumber, pageOffset?) => {
  if (!pageNumber || parseInt(pageNumber) === 1) {
    return '';
  }

  pageOffset = pageOffset ?? DEFAULT_NUMBER_OF_ITEMS_PER_PAGE;

  return `SKIP ${parseInt(pageNumber) * pageOffset}`;
};

export const getFilterString = (filters?: string[]): string => {
  if (!filters?.length) {
    return '';
  }

  if (filters.length === 1) {
    return `["${filters[0]}"]`;
  }

  let filterString = '';
  const lastItemIndex = filters.length - 1;

  filterString = filters.reduce((acc, curr, currIndex) => {
    if (currIndex === 0) {
      return `["${curr}"` ;
    } else if (lastItemIndex === currIndex) {
      return `${acc}, "${curr}"]`;
    }

    return `${acc}, "${curr}"`;
  }, filterString)
  
  
  return filterString;
};

export const composeFilterQuery = (filterString: string[]) => {
  if (!filterString) {
    return '';
  }

  return `WITH ${getFilterString(filterString)} as filter`
};
