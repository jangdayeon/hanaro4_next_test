'use client';

import { useRouter } from 'next/navigation';
import { removerecipe } from '@/lib/recipes';
import Button from './Button';

type Props = {
  // remove: () => void;
  id: number;
  se: string;
};

export default function DelBook({ id, se }: Props) {
  const router = useRouter();

  const remove = async () => {
    if (!confirm('삭제하시겠습니까?')) return;
    removerecipe(id, se);
    router.push('/recipes');
  };

  return (
    <Button onClick={remove} variant='btn-danger'>
      삭제
    </Button>
  );
}
