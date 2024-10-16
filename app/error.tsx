'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Button from '@/components/atoms/Button';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6 shadow shadow-blue-400 items-center gap-3'>
      <h2>잘못된 접근입니다!</h2>
      <Link href='/'>
        <Button variant='btn-danger'>홈으로 이동하기</Button>
      </Link>
    </div>
  );
}
