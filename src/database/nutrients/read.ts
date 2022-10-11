import { closeSession, openSession } from "..";
import { logError } from "../../lib/helpers";
import { Nutrient } from "../../types/nutrient";
import { errorMessages } from "../errors";

export const getRelatedNutrients = async (symptomId: string): Promise<Nutrient[] | []> => {
  const session = openSession();
  try {
    const query = `
    MATCH (s:Symptom {id: '${symptomId}'})<-[r:DEFICIENCY_MAY_CAUSE]-(nutrient:Nutrient)
    RETURN nutrient.name, nutrient.id, r.conclusion, r.references
    `;
    const result = await session.run(query);
    const nutrients = result.records.map(record => {
      return (
        {
          id: record.get('nutrient.id'),
          name: record.get('nutrient.name'),
          conclusion: record.get('r.conclusion'),
          references: record.get('r.references')
        }
      );
    });
    return nutrients;
  } catch(err) {
    logError(err);
    throw(err);
  } finally {
    await closeSession(session);
  }
};