require('dotenv').config();
import { getAllSymptoms, getSymptomsByName } from './read';

describe('Symptoms API Functionality', () => {
  test('can get all symptoms', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getAllSymptoms();
      expect(symptoms.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  test('can get a symptom by name', async () => {
    expect.assertions(1);
    try {
      const symptoms = await getSymptomsByName('pain');
      expect(symptoms.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toBeDefined();
    }
  })
});