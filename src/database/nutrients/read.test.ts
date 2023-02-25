require('dotenv').config();
import { driver } from '..';
import { logError } from '../../lib/helpers';
import { getFoodsWithSignificantNutrientAmount } from './read';

describe('Nutrient API Functionality', () => {
  afterAll(async () => {
    try {
      await driver.close();
    } catch(err) {
      logError(err);
      throw err;
    }
  });

  test('getFoodsWithSignificantNutrientAmount | if input ok returns a list of foods', async () => {
    expect.assertions(1);
    const age = 25;
    const gender = 'female';
    const nutrientName = 'calcium| ca';
    
    try {
      const foods = await getFoodsWithSignificantNutrientAmount({ nutrientName, gender, age });
      expect(foods.length).toBeGreaterThan(0);
    } catch(err) {
      expect(err).toBeDefined();
      throw err;
    }
  });

  test("getFoodsWithSignificantNutrientAmount | returns an empty list if inputs can't be found in database", async () => {
    expect.assertions(1);
    const age = 25;
    const gender = 'female';
    const nutrientName = 'calcium| ca';
    const threshold = 50000;

    try {
      const nutrients = await getFoodsWithSignificantNutrientAmount({ nutrientName, gender, age, threshold });
      expect(nutrients.length).toBe(0);
    } catch (err) {
      expect(err).toBeDefined();
      throw err;
    }
  });
});