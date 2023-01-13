import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import Counter from './components/Counter';
import CounterClass from './components/CounterClass'
import Posts from './components/Posts';

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <CounterClass />
      <Posts />
    </Provider>
  );
}

export default App;
