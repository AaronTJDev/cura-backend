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
  },
  nutrients: {
    idNotProvided: string;
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
    queryEmpty: 'Query string is empty'
  },
  nutrients: {
    idNotProvided: 'Nutrient ID not provided'
  }
};
