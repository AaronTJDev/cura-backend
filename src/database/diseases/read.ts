import { closeSession, openSession } from "..";
import { logError } from "../../lib/helpers";
import { Disease } from "../../types/disease";
import { errorMessages } from "../errors";

export const getSymptomArrString = (symptoms: string[]): string => {
  const symptomsStr = symptoms.reduce((symptomArrString, symptom, index) => {
    return index === (symptoms.length - 1)
      ? symptomArrString +=`'${symptom}'`
      : symptomArrString += `'${symptom}',`;
  }, '');

  return symptomsStr
};

export const getRelatedDiseases = async (symptoms: string[]) => {
  const session = openSession();
  try {
    const query = `
      WITH [${getSymptomArrString(symptoms)}] as symptoms
      MATCH (s:Symptom)-[:SYMPTOM_OF]->(disease:Disease)
      WHERE s.name in symptoms
      WITH disease, size(symptoms) as inputCount, count(DISTINCT s) as cnt
      WHERE cnt = inputCount
      RETURN disease.name, disease.description`;
    const result = await session.run(query);
    const diseases = result.records.map(record => {
      return {
        name: record.get('disease.name'),
        description: record.get('disease.description')
      };
    });
    return diseases;
  } catch(err) {
    logError(err);
    throw(err);
  } finally {
    await closeSession(session);
  }
};
