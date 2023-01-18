import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { exampleParamsThunkFunction } from '../../app/store';

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  // incrementAsync,
  incrementAsyncAlter,
} from '../../features/counter/CountSlice';

export default function Counter() {
  const value = useAppSelector(selectCount);
  const [requestStatus, setRequestStatus] = useState('idle');
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
      &nbsp;
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        减
      </button>
      &nbsp;
      <button
        onClick={() => {
          dispatch(incrementByAmount(3));
        }}>
        加3
      </button>
      &nbsp;
      <button
        type="button"
        onClick={async () => {
          // dispatch(incrementAsync(2));
          dispatch(exampleParamsThunkFunction(2))
        }}>
        异步加
      </button>
      &nbsp;
      <button
        type="button"
        onClick={async () => {
          try {
            setRequestStatus('pending');
            await dispatch(incrementAsyncAlter(2)).unwrap();
          } catch (error) {
            console.log(error);
          } finally {
            setRequestStatus('idle');
          }
        }}>
        异步加alter
      </button>
      <p>{requestStatus}</p>
    </div>
  );
}
