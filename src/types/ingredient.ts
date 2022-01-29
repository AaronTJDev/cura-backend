export type Ingredient = {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUri: string;
  substitutes: Ingredient[];
  recipes: Recipe[];
}

export type Quantity = {
  unit: string;
  amount: number;
}

export type IngredientQuantity = {
  ingredient: Ingredient;
  quantity: Quantity;
}

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