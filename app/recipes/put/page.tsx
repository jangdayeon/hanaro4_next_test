'use client';

import { type MySession } from '@/hooks/session-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/atoms/Button';

export default function RecipePut() {
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const router = useRouter();

  async function saveRecipe(e: React.FormEvent) {
    e.preventDefault();

    const title = (e.target as HTMLFormElement).title.value;
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

    // await fetch('/api/recipes/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     title,
    //     tags: recipeTags,
    //     ingredients: recipeIngredients,
    //     steps: recipeSteps,
    //   }),
    // }).then((response) => {
    //   if (!response.ok) {
    //     return alert('Error saving recipe');
    //   }
    //   router.push('/recipes');
    // });

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
      <h2 className='text-lg font-bold'>새 레시피 추가</h2>

      <form onSubmit={saveRecipe} className='space-y-3'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' className='border-4' required />
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
