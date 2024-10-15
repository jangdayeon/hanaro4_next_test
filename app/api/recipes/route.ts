import { recipes } from './recipedata';

export function GET() {
  return Response.json(recipes);
}

export async function POST(req: Request) {
  const { title, tags, ingredients, steps } = await req.json();
  const id = Math.max(...recipes.map(({ id }) => id), 0) + 1;
  const newer = { id, title, tags, ingredients, steps };
  recipes.push(newer);

  return Response.json(newer);
}
