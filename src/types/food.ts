export type Food = {
  suggestionKey: string;
  brandedFoodCategory: string;
  dataType: string;
  description: string;
  fdcId: string | number;
  foodClass: string;
  gtinUpc: string | number;
  ingredients: string;
  marketCountry: string;
  servingSize: string | number;
  servingSizeUnit: string;
}

type NutrientUnit = 'g' | 'mg' | 'kcal' | 'iu' | 'µg'; 
type NutrientName =
  'protein'
  |'total lipid (fat)'
  |'carbohydrate, by difference'
  |'energy' 
  |'sugars, total including nlea'
  |'fiber, total dietary'
  |'calcium, ca'
  |'iron, fe'
  |'sodium, na'
  |'vitamin a, iu'
  |'vitamin c, total ascorbic acid'
  |'cholesterol'
  |'fatty acids, total trans'
  |'fatty acids, total saturated'
  |'fatty acids, total monounsaturated'
  |'fatty acids, total polyunsaturated'
  |'potassium, k'
  |'vitamin d (d2 + d3), international units'
  |'sugars, added'
  |'magnesium, mg'
  |'phosphorus, p'
  |'fiber, soluble'
  |'fiber, insoluble'
  |'thiamin'
  |'niacin'
  |'total sugar alcohols'
  |'riboflavin'
  |'vitamin b-6'
  |'manganese, mn'
  |'selenium, se';