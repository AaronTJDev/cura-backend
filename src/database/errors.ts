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
    symptomNameNotProvidedOrUndefined: string;
  },
  nutrients: {
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
    symptomNameNotProvidedOrUndefined: 'Symptom name not provided or undefined'
  },
  nutrients: {
    nutrientIdNotProvidedOrUndefined: 'Nutrient ID not provided or undefined'
  }
};
