'use client';

import { useRouter } from 'next/navigation';
import { removerecipe } from '@/lib/recipes';
import Button from './Button';

type Props = {
  // remove: () => void;
  id: number;
};

export default function DelBook({ id }: Props) {
  const router = useRouter();

  const remove = async () => {
    if (!confirm('삭제하시겠습니까?')) return;
    removerecipe(id);
    router.push('/recipes');
  };

  return (
    <Button onClick={remove} variant='btn-danger'>
      삭제
    </Button>
  );
}
