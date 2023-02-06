interface ErrorMessages {
  session: {
    close: string;
  },
  driver: {
    close: string;
  },
  symptom: {
    getAllSymptoms: string;
    queryEmpty: string;
    symptomNameUndefined: string;
  },
  nutrients: {
    nutrientNameUndefined: string;
    ageUndefined: string;
    genderUndefined: string;
  }
};

export const errorMessages: ErrorMessages = {
  session: {
    close: 'There was an issue closing the session.'
  },
  driver: {
    close: 'There was an issue closing the driver.'
  },
  symptom: {
    getAllSymptoms: 'There was an issue getting all symptoms.',
    queryEmpty: 'Query string is empty',
    symptomNameUndefined: 'Symptom name is undefined'
  },
  nutrients: {
    nutrientNameUndefined: 'Nutrient name is undefined',
    ageUndefined: 'Age is undefined',
    genderUndefined: 'Gender is undefined'
  }
};
