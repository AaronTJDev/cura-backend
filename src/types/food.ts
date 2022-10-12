export type FoodNutrient = {
  type: string;
  id: number;
  nutrient: {
    id: number;
    number: string;
    name: NutrientName;
    rank: number;
    unitName: NutrientUnit
  };
  foodNutrientDerivation: {
    code: string;
    description: string;
    foodNutrientSource: {
      id: number;
      code: number;
      description: string
    }
  };
  amount: number
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