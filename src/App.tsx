import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import Counter from './components/Counter';
import Posts from './components/Posts';
import SinglePostPage from './components/Posts/SinglePostPage';
import EditPostForm from './components/Posts/EditPostForm';

function App() {
  const routers = [
    { id: 2, title: 'posts', path: '/posts' },
    { id: 1, title: 'counter', path: '/counter' },
  ];
  return (
    <Provider store={store}>
      <h1>RTK practice</h1>
      <ul style={{ display: 'inline-block' }}>
        {routers.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div style={{ marginLeft: '20px' }}>
        <Switch>
          <Route exact path={'/posts'} component={Posts} />
          <Route path={'/counter'} component={Counter} />
          <Route exact path="/posts/:id" component={SinglePostPage} />
          <Route path={'/editPost/:postId'} component={EditPostForm} />
          <Redirect to="/posts"></Redirect>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
