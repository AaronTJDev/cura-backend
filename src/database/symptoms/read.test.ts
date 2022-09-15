require('dotenv').config();
import { driver } from '..';
import { logError } from '../../lib/helpers';
import { getAllSymptoms, getSymptomsByName } from './read';

describe('Symptoms API Functionality', () => {
  afterAll(async () => {
    try {
      await driver.close();
    } catch(err) {
      logError(err);
      throw err;
    }
  });

  it('can get all symptoms', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getAllSymptoms();
      expect(symptoms.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('can get a symptom by name', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getSymptomsByName('pain');
      expect(symptoms.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  })

  it('returns an empty array if no results are found', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getSymptomsByName('this is not in database');
      expect(symptoms.length).toBe(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  })
});