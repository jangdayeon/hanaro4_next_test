import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { auth } from '@/lib/auth';
import Button from '@/components/atoms/Button';

export default async function Home({ children }: PropsWithChildren) {
  console.log('🚀 ~ Home ~ children:', children);
  const session = await auth();
  console.log('🚀 ~ Home ~ session:', session);

  return (
    <>
      {session?.user ? (
        <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 shadow shadow-blue-400 items-center gap-3'>
          {session.user.name}님 안녕하세요!
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
