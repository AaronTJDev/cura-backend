import { IngredientQuantity } from "./ingredient"

export type Pantry = {
  id: number;
  name: string;
  ingredients: IngredientQuantity[];
  createdAt: Date;
  updatedAt: Date;
}