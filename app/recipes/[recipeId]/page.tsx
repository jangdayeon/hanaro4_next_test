'use client';

import { getrecipe } from '@/actions/recipes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import DelBtn from '@/components/atoms/DelBtn';

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: number };
}) {
  // 타이머 상태 초기화
  const [timers, setTimers] = useState<{ time: number; isRunning: boolean }[]>(
    []
  );

  const { id, title, tags, ingredients, steps } = getrecipe(+recipeId);

  // steps가 변경될 때마다 timers를 초기화
  useEffect(() => {
    setTimers(steps.map(() => ({ time: 0, isRunning: false })));
  }, [steps]);

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
