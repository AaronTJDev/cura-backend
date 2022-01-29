import { IngredientQuantity, Recipe } from "./ingredient"

export type Pantry = {
  id: number;
  name: string;
  ingredients: IngredientQuantity[];
  recipes: Recipe[];
  createdAt: Date;
  updatedAt: Date;
}