import { CATEGORY_NAME, EnumCategories, CATEGORY_PARAMS } from '~types/product';

export const categories = [
  {
    title: CATEGORY_NAME[EnumCategories.gypsophila],
    paramValue: CATEGORY_PARAMS[EnumCategories.gypsophila]
  },
  {
    title: CATEGORY_NAME[EnumCategories.chamomile],
    paramValue: CATEGORY_PARAMS[EnumCategories.chamomile]
  },
  {
    title: CATEGORY_NAME[EnumCategories.chrysanthemum],
    paramValue: CATEGORY_PARAMS[EnumCategories.chrysanthemum]
  },
  {
    title: CATEGORY_NAME[EnumCategories.indoor],
    paramValue: CATEGORY_PARAMS[EnumCategories.indoor]
  },
  {
    title: CATEGORY_NAME[EnumCategories.mono],
    paramValue: CATEGORY_PARAMS[EnumCategories.mono]
  },
  {
    title: CATEGORY_NAME[EnumCategories.compositions],
    paramValue: CATEGORY_PARAMS[EnumCategories.compositions]
  },
  {
    title: CATEGORY_NAME[EnumCategories.holiday],
    paramValue: CATEGORY_PARAMS[EnumCategories.holiday]
  },
  {
    title: CATEGORY_NAME[EnumCategories.envelope],
    paramValue: CATEGORY_PARAMS[EnumCategories.envelope]
  },
  {
    title: CATEGORY_NAME[EnumCategories.postcards],
    paramValue: CATEGORY_PARAMS[EnumCategories.postcards]
  },
  {
    title: CATEGORY_NAME[EnumCategories.gifts],
    paramValue: CATEGORY_PARAMS[EnumCategories.gifts]
  },
  {
    title: CATEGORY_NAME[EnumCategories.driedFlowers],
    paramValue: CATEGORY_PARAMS[EnumCategories.driedFlowers]
  },
  {
    title: CATEGORY_NAME[EnumCategories.balloon],
    paramValue: CATEGORY_PARAMS[EnumCategories.balloon]
  },
  {
    title: CATEGORY_NAME[EnumCategories.popular],
    paramValue: CATEGORY_PARAMS[EnumCategories.popular]
  },
  {
    title: CATEGORY_NAME[EnumCategories.roses],
    paramValue: CATEGORY_PARAMS[EnumCategories.roses]
  },
  {
    title: CATEGORY_NAME[EnumCategories.funeral],
    paramValue: CATEGORY_PARAMS[EnumCategories.funeral]
  },
  {
    title: CATEGORY_NAME[EnumCategories.packaging],
    paramValue: CATEGORY_PARAMS[EnumCategories.packaging]
  },
  {
    title: CATEGORY_NAME[EnumCategories.wedding],
    paramValue: CATEGORY_PARAMS[EnumCategories.wedding]
  },
  {
    title: CATEGORY_NAME[EnumCategories.interior],
    paramValue: CATEGORY_PARAMS[EnumCategories.interior]
  },
  {
    title: CATEGORY_NAME[EnumCategories.autumn],
    paramValue: CATEGORY_PARAMS[EnumCategories.autumn]
  },
  {
    title: CATEGORY_NAME[EnumCategories.individual],
    paramValue: CATEGORY_PARAMS[EnumCategories.individual]
  },
  {
    title: CATEGORY_NAME[EnumCategories.prefabricated],
    paramValue: CATEGORY_PARAMS[EnumCategories.prefabricated]
  },
  {
    title: CATEGORY_NAME[EnumCategories.additionally],
    paramValue: CATEGORY_PARAMS[EnumCategories.additionally]
  }
];

export const categoriesIndex: Record<string, number> = {};

categories.forEach((category, index) => {
  categoriesIndex[category.paramValue] = index;
});
