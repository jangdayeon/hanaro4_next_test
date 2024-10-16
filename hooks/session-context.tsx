import { Recipe } from '../app/api/recipes/recipedata';

export const SampleSession: MySession = {
  loginUser: { email: '' },
  recipes: [],
};
export type MySession = { loginUser: { email: string }; recipes: Recipe[] };
