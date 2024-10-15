import { getrecipe, save } from '@/actions/recipes';
import { notFound } from 'next/navigation';
import { recipe, recipes } from '../recipedata';

type Params = {
  params: { recipeId: number };
};
export function GET(req: Request, { params: { recipeId } }: Params) {
  const recipe = getrecipe(recipeId);
  if (!recipe) return notFound();
  return Response.json(recipe);
}
export async function PATCH(req: Request, { params: { recipeId } }: Params) {
  const { title, tags, ingredients, steps } = (await req.json()) as recipe;

  const recipe = save(+recipeId, title, tags, ingredients, steps);

  return Response.json(recipe);
}

export function DELETE(req: Request, { params: { recipeId } }: Params) {
  const idx = recipes.findIndex(
    (recipe: { id: number }) => recipe.id === +recipeId
  );
  if (idx === -1) return Response.json({ code: 404, message: 'Not Found' });

  recipes.splice(idx, 1);
  return Response.json({ message: 'ok', code: 200 });
}
