import { IngredientQuantity } from './ingredient';

export type Recipe = {
  id: number;
  name: string;
  ingredients: IngredientQuantity[];
}