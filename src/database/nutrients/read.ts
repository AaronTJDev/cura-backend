import { closeSession, openSession } from "..";
import { getGenderAgeRangeString, logError } from "../../lib/helpers";
import { Food } from "../../types/food";
import { Nutrient } from "../../types/nutrient";
import { errorMessages } from "../errors";

/**
 * 
 * @param nutrientName name of the nutrient
 * @param gender user's gender
 * @param age user's age
 * @param threshold Significance threshold.
 * For the given nutrient it will only return foods that cotain an amount that is greater than
 * ${threshold} * the recommended daily allowance of that nutrient for a given gender and age range.
 * Default value: 0.5
 * @returns 
 */
export const getFoodsWithSignificantNutrientAmount = async (
  nutrientName: string,
  gender: string,
  age: number | string,
  threshold?: number
): Promise<Food[]> => {
  threshold = threshold ? threshold : 0.5 ;
  const session = openSession();
  try {
    const query = `
      MATCH (food:Food)<-[r:HAS_NUTRIENT]-(n:Nutrient {name: '${nutrientName}'})
      WHERE (r.amount/toFloat(n.${getGenderAgeRangeString(gender, age)})) > ${threshold}
      RETURN food LIMIT 25
    `;
    const result = await session.run(query);
    const foods: Food[] = result.records.map(record => {
      return (
        {
          brandedFoodCategory: record.get('food.brandedFoodCategory'),
          dataType: record.get('food.dataType'),
          description: record.get('food.description'),
          fdcId: record.get('food.fdcId'),
          foodClass: record.get('food.foodClass'),
          gtinUpc: record.get('food.gtinUpc'),
          ingredients: record.get('food.ingredients'),
          marketCountry: record.get('food.marketCountry'),
          servingSize: record.get('food.servingSize'),
          servingSizeUnit: record.get('food.servingSizeUnit')
        }
      );
    });
    return foods;
  } catch (err) {
    logError(err);
    throw(err);
  } finally {
    await closeSession(session);
  }
};


