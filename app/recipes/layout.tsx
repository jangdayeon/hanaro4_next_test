import Link from 'next/link';
import { ReactNode } from 'react';
import Button from '@/components/atoms/Button';

export default function recipesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <div className='flex justify-between h-full bg-green-400'>
          <div className='flex m-4 text-white p-2 font-bold text-lg'>
            <Link href='/recipes'>나만의 레시피</Link>
          </div>
          <div className='flex flex-row my-4 gap-2 mx-2'>
            <Link href='/recipes/put' passHref>
              <Button variant='btn-primary'>레시피 추가</Button>
            </Link>
            <Link href='/api/auth/signout' passHref>
              <Button variant='btn-danger'>로그아웃</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
