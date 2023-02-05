export type Account = {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  imageUri: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AgeRanges {
  AGES_1_3 = '1_3',
  AGES_4_8 = '4_8',
  AGES_9_13 = '9_13',
  AGES_14_18 = '14_18',
  AGES_19_30 = '19_30',
  AGES_31_50 = '31_50',
  AGES_51_PLUS = '51'
};
