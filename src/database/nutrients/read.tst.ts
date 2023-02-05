require('dotenv').config();
import { driver } from '..';
import { logError } from '../../lib/helpers';

describe('Nutrient API Functionality', () => {
  afterAll(async () => {
    try {
      await driver.close();
    } catch(err) {
      logError(err);
      throw err;
    }
  });
});