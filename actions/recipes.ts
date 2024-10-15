import { recipe, recipes } from '@/app/api/recipes/recipedata';

export const getrecipe = (recipeId: number) =>
  recipes.find(({ id }) => id === recipeId) as recipe;

export const save = (
  id: number,
  title: string,
  tags: string[],
  ingredients: string[],
  steps: string[]
) => {
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (!recipe) return Response.json({ code: 404, message: 'Not Found' });

  recipe.title = title;
  recipe.tags = tags;
  recipe.ingredients = ingredients;
  recipe.steps = steps;

  return recipe;
};

// export const remove = (
//   id:
// )
