import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Counter from './components/Counter';
import CounterClass from './components/CounterClass'

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <CounterClass />
    </Provider>
  );
}

export default App;
