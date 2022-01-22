export type Ingredient = {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUri: string;
  substitutes: Ingredient[];
}

export type Quantity = {
  unit: string;
  amount: number;
}

export type IngredientQuantity = {
  ingredient: Ingredient;
  quantity: Quantity;
}
