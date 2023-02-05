require('dotenv').config();
import { driver } from '..';
import { logError } from '../../lib/helpers';
import { getAllSymptoms, getRelatedNutrients, getSymptomsByName } from './read';

describe('Symptoms API Functionality', () => {
  afterAll(async () => {
    try {
      await driver.close();
    } catch(err) {
      logError(err);
      throw err;
    }
  });

  it('getAllSymptoms | can get all symptoms', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getAllSymptoms();
      expect(symptoms.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('getSymptomsByName | can get a symptom by name', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getSymptomsByName('pain');
      expect(symptoms.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('getSymptomsByName | returns an empty array if no results are found', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getSymptomsByName('this is not in database');
      expect(symptoms.length).toBe(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  test("getRelatedNutrients | handles a single symptom returning a list of nutrients", async () => {
    expect.assertions(1);
    const symptom = 'headache';
    try {
      const nutrients = await getRelatedNutrients(symptom);
      expect(nutrients.length).toBeGreaterThanOrEqual(1);
    } catch (err) {
      expect(err).toBeDefined();
      throw err;
    }
  });

  test("getRelatedNutrients | returns an empty list if input can't be found in database", async () => {
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