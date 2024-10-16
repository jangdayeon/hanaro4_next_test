'use client';

import { getallrecipe } from '@/actions/recipes';
import { SampleSession } from '@/hooks/session-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

export default function recipes() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession().data?.user?.email ?? '';
  if (!localStorage.getItem('user')) {
    localStorage.setItem(
      'user',
      JSON.stringify({ ...SampleSession, loginUser: session })
    );
  }
  const recipes = getallrecipe();

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
        <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 shadow shadow-blue-400 items-center gap-3'>
          <h2>작성하신 레시피가 없습니다!</h2>
          <Link href='/recipes/put'>
            <Button variant='btn-primary'>레시피 추가하기</Button>
          </Link>
        </div>
      )}
    </>
  );
}
