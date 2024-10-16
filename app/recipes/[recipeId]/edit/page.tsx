'use client';

import { editrecipe, getrecipe } from '@/actions/recipes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/atoms/Button';

export default function RecipeEdit({
  params: { recipeId },
}: {
  params: { recipeId: number };
}) {
  const r = getrecipe(+recipeId)[0];
  const [tags, setTags] = useState<string[]>(r.tags);
  const [ingredients, setIngredients] = useState<string[]>(r.ingredients);
  const [steps, setSteps] = useState<string[]>(r.steps);
  const router = useRouter();

  async function saveRecipe(e: React.FormEvent) {
    e.preventDefault();

    const t = (e.currentTarget as HTMLFormElement).elements.namedItem(
      'title'
    ) as HTMLInputElement;
    const title = t.value;
    const recipeTags = tags;
    const recipeIngredients = ingredients;
    const recipeSteps = steps;

    if (
      !title ||
      recipeTags.length === 0 ||
      recipeIngredients.length === 0 ||
      recipeSteps.length === 0
    ) {
      alert('항목을 모두 채워주세요.');
      return;
    }

    editrecipe(recipeId, title, recipeTags, recipeIngredients, recipeSteps);
    router.push('/recipes');
  }

  function addTag(e: React.MouseEvent) {
    e.preventDefault();
    const input = (
      document.querySelector('input[name="tag"]') as HTMLInputElement
    ).value;
    if (input && !tags.includes(input)) {
      setTags([...tags, input]);
      (document.querySelector('input[name="tag"]') as HTMLInputElement).value =
        '';
    }
  }

  function addIngredient(e: React.MouseEvent) {
    e.preventDefault();
    const input = (
      document.querySelector('input[name="ingredient"]') as HTMLInputElement
    ).value;
    if (input && !ingredients.includes(input)) {
      setIngredients([...ingredients, input]);
      (
        document.querySelector('input[name="ingredient"]') as HTMLInputElement
      ).value = '';
    }
  }

  function addStep(e: React.MouseEvent) {
    e.preventDefault();
    const input = (
      document.querySelector('input[name="step"]') as HTMLInputElement
    ).value;
    if (input && !steps.includes(input)) {
      setSteps([...steps, input]);
      (document.querySelector('input[name="step"]') as HTMLInputElement).value =
        '';
    }
  }

  function removeTag(tagToRemove: string) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function removeIngredient(ingredientToRemove: string) {
    setIngredients(
      ingredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  function removeStep(stepToRemove: string) {
    setSteps(steps.filter((step) => step !== stepToRemove));
  }

  return (
    <div className='m-5'>
      <h2 className='text-lg font-bold'>레시피 수정</h2>

      <form onSubmit={saveRecipe} className='space-y-3'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            className='border-4'
            defaultValue={r.title}
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='tag'>Tags</label>
          <div className='flex flex-row gap-2'>
            <input type='text' name='tag' className='border-4' />
            <Button variant='btn-edit' onClick={addTag}>
              추가
            </Button>
          </div>
          <div>
            추가된 태그:
            {tags.map((tag) => (
              <span key={tag} className='mr-2'>
                {tag}
                <Button variant='btn-danger' onClick={() => removeTag(tag)}>
                  삭제
                </Button>
              </span>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='ingredient'>Ingredients</label>
          <div className='flex flex-row gap-2'>
            <input type='text' name='ingredient' className='border-4' />
            <Button variant='btn-edit' onClick={addIngredient}>
              추가
            </Button>
          </div>
          <div>
            추가된 재료:
            {ingredients.map((ingredient) => (
              <span key={ingredient} className='mr-2'>
                {ingredient}
                <Button
                  variant='btn-danger'
                  onClick={() => removeIngredient(ingredient)}
                >
                  삭제
                </Button>
              </span>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='step'>Steps</label>
          <div className='flex flex-row gap-2'>
            <input type='text' name='step' className='border-4' />
            <Button variant='btn-edit' onClick={addStep}>
              추가
            </Button>
          </div>
          <div>
            추가된 단계:
            {steps.map((step) => (
              <div key={step} className='mr-2'>
                {step}
                <Button variant='btn-danger' onClick={() => removeStep(step)}>
                  삭제
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type='submit' variant='btn-primary'>
          Save
        </Button>
      </form>
    </div>
  );
}
