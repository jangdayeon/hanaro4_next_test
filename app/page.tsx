'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { SampleSession } from '../hooks/session-context';

export default function Home() {
  const session = useSession().data?.user?.email ?? '';
  localStorage.setItem(
    'user',
    JSON.stringify({ ...SampleSession, loginUser: session })
  );

  return (
    <>
      {session ? (
        <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 shadow shadow-blue-400 items-center gap-3'>
          {session}님 안녕하세요!
          <Link href='/recipes'>
            <Button variant='btn-primary'>레시피 확인하기</Button>
          </Link>
        </div>
      ) : (
        <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 shadow shadow-blue-400 items-center gap-3'>
          안녕하세요!
          <Link href='/api/auth/signin'>
            <Button variant='btn-primary'>Log In</Button>
          </Link>
        </div>
      )}
    </>
  );
}
