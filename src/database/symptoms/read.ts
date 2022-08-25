import { closeSession, openSession } from "..";

export const getAllSymptoms = async () => {
  const { driver, session } = openSession();
  try {
    const query = `MATCH (symptom:Symptom) RETURN symptom.name, symptom.description`;
    const result = await session.run(query);
    const symptoms = result.records.map(record => {
      return (
        {
          name: record.get('symptom.name'),
          description: record.get('symptom.description')
        }
      );
    });
    return symptoms;
  } catch (err) {
    console.log('Err:', err);
    throw(err);
  } finally {
    await closeSession(driver, session);
  }
};