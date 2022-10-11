require('dotenv').config();
import { driver } from '..';
import { logError } from '../../lib/helpers';
import { getRelatedNutrients } from './read';

describe('Nutrient API Functionality', () => {
  afterAll(async () => {
    try {
      await driver.close();
    } catch(err) {
      logError(err);
      throw err;
    }
  });

  test("getRelatedNutrients handles a single symptom returning a list of nutrients", async () => {
    expect.assertions(1);
    const diarrheaSymptomId = '21a8ed4b-1f20-49d4-84da-f321f2fdee74';
    try {
      const nutrients = await getRelatedNutrients(diarrheaSymptomId);
      expect(nutrients.length).toBeGreaterThanOrEqual(1);
    } catch (err) {
      expect(err).toBeDefined();
      throw err;
    }
  });

  test("getRelatedNutrients returns an empty list if input can't be found in database", async () => {
    expect.assertions(1);
    const symptom = 'noodl3s';
    try {
      const nutrients = await getRelatedNutrients(symptom);
      expect(nutrients.length).toBe(0);
    } catch (err) {
      expect(err).toBeDefined();
      throw err;
    }
  });
});