import { defaultVersions, Recipe } from '@/app/api/recipes/recipedata';
import { MySession } from '@/hooks/session-context';

export const getallrecipe = () => {
  const session: MySession = {
    ...JSON.parse(localStorage.getItem('user') ?? ''),
  };
  const recipes = session.recipes.map((r) => {
    const sortedVersion = r.versions.sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    return { ...sortedVersion[0], id: r.id };
  });
  return recipes;
};

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

export const editrecipe = (
  recipeId: number,
  title: string,
  recipeTags: string[],
  recipeIngredients: string[],
  recipeSteps: string[]
) => {
  const session = JSON.parse(localStorage.getItem('user') ?? '');
  const s: MySession = { ...session };

  // 레시피에서 특정 id에 해당하는 레시피를 찾음
  const versions = s.recipes.find((r) => r.id === +recipeId)?.versions ?? [];

  // 각 레시피를 업데이트
  const recipes = s.recipes.map((r) =>
    r.id === +recipeId
      ? {
          ...r, // 레시피 객체의 다른 필드도 유지
          versions: [
            ...r.versions,
            {
              id: Math.max(...versions.map(({ id }) => id), 0) + 1, // 새로운 버전 id
              title: title, // 새로운 제목
              tags: recipeTags, // 새로운 태그
              ingredients: recipeIngredients, // 새로운 재료
              steps: recipeSteps, // 새로운 조리 과정
              date: new Date().toISOString(), // 수정된 날짜
            },
          ],
        }
      : r
  );

  // 로컬 스토리지에 새로운 데이터를 저장
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...s,
      recipes: recipes, // 업데이트된 레시피 배열 저장
    })
  );
  return;
};

export const putrecipe = (
  title: string,
  recipeTags: string[],
  recipeIngredients: string[],
  recipeSteps: string[]
) => {
  const session = JSON.parse(localStorage.getItem('user') ?? '');
  const s: MySession = { ...session };
  const id = Math.max(...s.recipes.map(({ id }) => id), 0) + 1;
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...s,
      recipes: [
        ...s.recipes,
        {
          id,
          versions: [
            {
              id: 1,
              title: title,
              tags: recipeTags,
              ingredients: recipeIngredients,
              steps: recipeSteps,
              date: new Date().toISOString(),
            },
          ],
        },
      ],
    })
  );
};
