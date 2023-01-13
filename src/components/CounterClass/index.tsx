import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { AppState } from '../../app/store';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../../features/counter/CountSlice';

class CounterClass extends Component<CountProps & CountDispatchProps> {
  render() {
    return (
      <div>
        <h2>当前数量为: {this.props.count}</h2>
        <Button
          onClick={() => {
            this.props.increment()
          }}>
          加
        </Button>
        <Button
          onClick={() => {
            this.props.decrement()
          }}>
          减
        </Button>
        <Button
          onClick={() => {
            this.props.incrementByAmount(3)
          }}>
          加3
        </Button>
      </div>
    );
  }
  
}

function mapStateToProps(state: AppState) {
  return { count: state.counter.value };
}

const mapDispatchToProps = {
  increment,
  decrement,
  incrementByAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterClass);

type CountProps = ReturnType<typeof mapStateToProps>;

type CountDispatchProps = typeof mapDispatchToProps;