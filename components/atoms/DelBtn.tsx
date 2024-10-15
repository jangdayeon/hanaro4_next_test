'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

type Props = {
  // remove: () => void;
  id: number;
};

export default function DelBook({ id }: Props) {
  const router = useRouter();

  const remove = async () => {
    if (!confirm('삭제하시겠습니까?')) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/recipes/${id}`,
      {
        method: 'DELETE',
      }
    ).then((res) => res.json());
    if (res.code !== 200) alert('삭제를 실패했습니다. 다시 시도해주세요.');
    router.push('/recipes');
  };

  return (
    <Button onClick={remove} variant='btn-danger'>
      삭제
    </Button>
  );
}
