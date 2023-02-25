import { query } from "express";
import { closeSession, openSession } from "..";
import { DEFAULT_FOOD_RESULT_LIMIT } from "../../lib/constants";
import { composeFilterQuery, getGenderAgeRangeString, getPaginationString, logError } from "../../lib/helpers";
import { Food } from "../../types/food";

type getFoodsOptions = {
  nutrientName: string;
  gender: string;
  age: number | string;
  threshold?: number;
  pageNumber?: number | string;
  pageOffset?: number;
  limit?: number;
  filter?: string[];
};

/**
 * 
 * @param options
 * @param options.nutrientName name of the nutrient
 * @param options.gender user's gender
 * @param options.age user's age
 * @param options.threshold Significance threshold.
 * @param options.pageNumber variable for pagination offset calculation
 * @param options.pageOffset variable for how many items to skip over in pagination offset calculation | default 25
 * @param options.limit the number of items that will be returned | default 25
 * @param options.filter a URL encoded list of filter options
 * For the given nutrient it will only return foods that cotain an amount that is greater than
 * ${threshold} * the recommended daily allowance of that nutrient for a given gender and age range.
 * Default value: 0.5
 * @returns 
 */
export const getFoodsWithSignificantNutrientAmount = async (
 options: getFoodsOptions
): Promise<Food[]> => {
  let {
    nutrientName,
    gender,
    age,
    threshold,
    pageNumber,
    pageOffset,
    limit,
    filter
  } = options;
  threshold = threshold ? threshold : 0.5 ;
  pageNumber = getPaginationString(pageNumber, pageOffset);
  limit = limit ?? DEFAULT_FOOD_RESULT_LIMIT;
  const filterQuery = composeFilterQuery(filter);

  const session = openSession();

  try {
    // @to-do add filters to query
    const query = `
      ${!!filter ? filterQuery : ''}
      MATCH (food:Food)<-[r:HAS_NUTRIENT]-(n:Nutrient {name: '${nutrientName}'})
      WHERE (r.amount/toFloat(n.${getGenderAgeRangeString(gender, age)})) > ${threshold}
      ${!!filter ? ' AND food.brandedFoodCategory IN filter' : ''}
      RETURN 
        food.brandedFoodCategory,
        food.dataType,
        food.description,
        food.fdcId,
        food.foodClass,
        food.gtinUpc,
        food.ingredients,
        food.marketCountry,
        food.servingSize,
        food.servingSizeUnit,
        r.amount,
        r.unitName,
        n.name
      ORDER BY r.amount DESC
      ${pageNumber}
      LIMIT ${limit}
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
          servingSizeUnit: record.get('food.servingSizeUnit'),
          amount: record.get('r.amount'),
          unitName: record.get('r.unitName'),
          name: record.get('n.name')
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
