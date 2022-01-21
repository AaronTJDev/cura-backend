export type Ingredient = {
  id: number;
  name: string;
  category: string;
}

export type IngredientQuantity = {
  ingredient: Ingredient;
  quantity: number;
}