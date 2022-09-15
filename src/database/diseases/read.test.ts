require('dotenv').config();
import { driver } from '..';
import { logError } from '../../lib/helpers';
import { getRelatedDiseases, getSymptomArrString } from './read';

describe('Diseases API Functioality', () => {
  afterAll(async () => {
    try {
      await driver.close();
    } catch(err) {
      logError(err);
      throw err;
    }
  });

  it('getSymptomArrString returns a string from a list of symptoms', () => {
    const symptoms = ['headache', 'heart burn', 'stress'];
    const symptomStr = getSymptomArrString(symptoms);
    expect(symptomStr).toBe("'headache','heart burn','stress'");
  });

  it('getSymptomArrString returns an empty string if an empty array is provided', () => {
    const symptomStr = getSymptomArrString([]);
    expect(symptomStr).toBe('');
  });

  it('getRelatedDiseases accepts a list of nutrients and returns a list of illnesses', async () => {
    expect.assertions(1);
    try {
      const symptoms = ['fatigue', 'weight loss']
      const diseases = await getRelatedDiseases(symptoms);
      expect(diseases.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
      throw err;
    }
  });

  it('getRelatedDiseases accepts an empty list and returns an empty list', async () => {
    expect.assertions(1);
    try {
      const symptoms = []
      const diseases = await getRelatedDiseases(symptoms);
      expect(diseases.length).toBe(0);
    } catch (err) {
      expect(err).toBeDefined();
      throw err;
    }
  });
});