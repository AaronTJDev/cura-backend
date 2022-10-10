interface IThreshold {
  value: number;
  measurement: string;
}

type Classificaton = "carbohydrate" | "protein" | "fat" | "vitamin" | "mineral" | "water";

type Interval = "daily" | "weekly" | "monthly" | "annually";

export type Nutrient = {
  id: string;
  name: string;
  type?: Classificaton;
}

export interface INutrientSymptomRelationship {
  id: string;
  title: string;
  uri: string;
  amount: number;
  interval: Interval;
  conclusion: string;
  author: string;
  publishDate: Date;
}
