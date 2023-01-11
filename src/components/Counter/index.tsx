import React from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hook';

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  incrementAsync
} from '../../features/counter/CountSlice';

export default function Counter() {
  const value = useAppSelector(selectCount);
  // 通过useDispatch 派发事件
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>当前数量为: {value}</h2>
      <Button
        onClick={() => {
          dispatch(increment());
        }}>
        加
      </Button>
      <Button
        onClick={() => {
          dispatch(decrement());
        }}>
        减
      </Button>
      <Button
        onClick={() => {
          dispatch(incrementByAmount(3));
        }}>
        加3
      </Button>

      <Button onClick={
        () => {
          dispatch(incrementAsync(2));
        }
      }>异步加</Button>
    </div>
  );
}
