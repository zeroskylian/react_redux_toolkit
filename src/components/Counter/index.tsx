import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  incrementAsync,
} from '../../features/counter/CountSlice';

export default function Counter() {
  const value = useAppSelector(selectCount);
  // 通过useDispatch 派发事件
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>当前数量为: {value}</h2>
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        加
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        减
      </button>
      <button
        onClick={() => {
          dispatch(incrementByAmount(3));
        }}>
        加3
      </button>

      <button
        onClick={() => {
          dispatch(incrementAsync(2));
        }}>
        异步加
      </button>
    </div>
  );
}
