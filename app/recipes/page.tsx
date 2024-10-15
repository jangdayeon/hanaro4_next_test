import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/atoms/Button';
import { recipe } from '../api/recipes/recipedata';

export default async function recipes() {
  const recipes: recipe[] = await fetch(
    'http://localhost:3000/api/recipes'
  ).then((response) => {
    if (!response.ok) {
      return notFound();
    }
    return response.json();
  });
  return (
    <>
      {recipes?.length ? (
        <>
          {recipes?.map(({ id, title, tags }) => (
            // eslint-disable-next-line react/jsx-key
            <div className='flex flex-col border-2 m-3 rounded-lg p-2'>
              <h2 className='font-bold'>{title}</h2>
              <div className='flex flex-row gap-2'>
                {tags?.map((t, i) => (
                  <div
                    key={i}
                    className='border bg-slate-200 rounded-md px-2 my-1'
                  >
                    # {t}
                  </div>
                ))}
              </div>
              <Link href={`/recipes/${id}`}>
                <Button variant='btn-success' classNames='flex flex-col'>
                  자세히 보기
                </Button>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div> There is no recipes</div>
      )}
    </>
  );
}
