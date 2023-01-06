interface IThreshold {
  value: number;
  measurement: string;
}

type Classificaton = "carbohydrate" | "protein" | "fat" | "vitamin" | "mineral" | "water";

type Interval = "daily" | "weekly" | "monthly" | "annually";

interface INutrientSymptomRelation {
  description: string;
  references: string[];
  authors: string;
}

export interface Nutrient extends INutrientSymptomRelation {
  id?: string;
  name: string;
  type?: Classificaton;
}
