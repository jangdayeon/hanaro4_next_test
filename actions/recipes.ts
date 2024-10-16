import { defaultVersions, Recipe } from '@/app/api/recipes/recipedata';
import { MySession } from '@/hooks/session-context';

export const getrecipe = (recipeId: number) => {
  const session: MySession = {
    ...JSON.parse(localStorage.getItem('user') ?? ''),
  };
  const recipe = session.recipes.find((r) => r.id === recipeId);
  if (!recipe || !recipe.versions || recipe.versions.length === 0) {
    return defaultVersions;
  }
  return recipe?.versions.sort((a, b) => b.date.localeCompare(a.date));
};

export const restorerecipe = (recipeId: number, versionId: number) => {
  const session: MySession = {
    ...JSON.parse(localStorage.getItem('user') ?? ''),
  };
  const recipe: Recipe[] = session.recipes.map((r) =>
    r.id === +recipeId
      ? {
          id: +recipeId,
          versions: r.versions.map((v) =>
            v.id === versionId ? { ...v, date: new Date().toISOString() } : v
          ),
        }
      : r
  );

  localStorage.setItem('user', JSON.stringify({ ...session, recipes: recipe }));
  return getrecipe(+recipeId);
};

export const removerecipe = (recipeId: number) => {
  const session: MySession = {
    ...JSON.parse(localStorage.getItem('user') ?? ''),
  };
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...session,
      recipes: session.recipes.filter((r) => r.id !== recipeId),
    })
  );
  return;
};
