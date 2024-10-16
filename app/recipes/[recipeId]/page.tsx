'use client';

import { getrecipe, restorerecipe } from '@/actions/recipes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import DelBtn from '@/components/atoms/DelBtn';

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = date.getDate().toString().padStart(2, '0');

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 || 12; // 12시간 형식으로 변환
  const formattedHours = hours.toString().padStart(2, '0');

  return `수정일: ${year}.${month}.${day}. ${ampm} ${formattedHours}:${minutes}:${seconds}`;
}

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: number };
}) {
  // 타이머 상태 초기화
  const [timers, setTimers] = useState<{ time: number; isRunning: boolean }[]>(
    []
  );

  const [recipes, setRecipes] = useState(getrecipe(+recipeId));
  const { id, title, tags, ingredients, steps } = recipes[0];

  useEffect(() => {
    setTimers(steps.map(() => ({ time: 0, isRunning: false })));
  }, []);

  if (!id) return notFound();

  const handleStartTimer = (index: number, duration: number) => {
    if (timers[index]?.isRunning || duration <= 0) return;

    // 타이머 상태 업데이트
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[index].time = duration;
      newTimers[index].isRunning = true;

      return newTimers;
    });

    const countdown = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        if (newTimers[index].time <= 1) {
          clearInterval(countdown);
          newTimers[index].isRunning = false;
          newTimers[index].time = 0; // 타이머 종료
          alert('타이머 종료!');
          return newTimers;
        }
        newTimers[index].time -= 1; // 1초씩 감소
        return newTimers;
      });
    }, 1000);
  };

  const restore = (versionId: number) => {
    setRecipes(restorerecipe(recipeId, versionId));
  };

  return (
    <div className='p-5'>
      <h1 className='font-bold text-lg'>{title}</h1>
      <div className='p-3'>
        <h2 className='font-semibold text-lg'>조리 과정</h2>

        {steps?.map((s, i) => (
          <div key={i}>
            <div>
              Step {i + 1}: {s}
            </div>
            <div className='flex flex-row py-4'>
              <input
                type='number'
                className='border-4'
                placeholder='시간 (초)'
                id={`timer-input-${i}`} // 고유 ID 부여
              />
              <Button
                variant='btn-primary'
                onClick={() => {
                  const input = document.getElementById(
                    `timer-input-${i}`
                  ) as HTMLInputElement;
                  const duration = parseInt(input.value);
                  handleStartTimer(i, duration);
                }}
                disabled={timers[i]?.isRunning} // 타이머가 실행 중일 때는 버튼 비활성화
              >
                타이머 시작
              </Button>
              {timers[i]?.isRunning && timers[i].time !== null && (
                <div className='ml-2'>남은 시간: {timers[i].time}초</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-row gap-2 p-3'>
        {tags?.map((t, i) => (
          <div key={i} className='border bg-slate-200 rounded-md px-2 my-1'>
            # {t}
          </div>
        ))}
      </div>

      <div className='p-3'>
        <h2 className='font-semibold text-lg'>재료</h2>

        <ul className='list-disc list-inside'>
          {ingredients?.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className='p-3'>
        <h2 className='font-semibold text-lg'>조리 과정</h2>

        <ol className='list-decimal list-inside'>
          {steps?.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      <div className='p-3'>
        <h2 className='font-semibold text-lg'>수정 기록</h2>
        <ol>
          {recipes?.map((r, i) => (
            <li key={i}>
              <span className='font-bold'>버전{i + 1} </span>
              {formatDate(r.date)}
              <Button variant='btn-primary' onClick={() => restore(r.id)}>
                이 버전으로 복원
              </Button>
            </li>
          ))}
        </ol>
      </div>

      <div className='p-3 flex flex-row gap-2'>
        <Link href={`/recipes/${recipeId}/edit`}>
          <Button variant='btn-edit'>수정</Button>
        </Link>
        <DelBtn id={id}></DelBtn>
        <Link href={`/recipes`}>
          <Button variant='btn-back'>목록으로</Button>
        </Link>
      </div>
    </div>
  );
}
