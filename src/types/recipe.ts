import { IngredientQuantity } from './ingredient';

export type Recipe = {
  id: number;
  name: string;
  ingredients: IngredientQuantity[];
  description: string;
  imageUri: string;
  instructions: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
}