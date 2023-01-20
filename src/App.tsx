import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import store from './app/store';
import Counter from './components/Counter';
import Posts from './components/Posts';
import SinglePostPage from './components/Posts/SinglePostPage';
import EditPostForm from './components/Posts/EditPostForm';
import UserList from './components/Users';
import UserPostList from './components/Users/UserPostList';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <h1>RTK practice</h1>
      <Nav />
      <div style={{ marginLeft: '20px' }}>
        <Switch>
          <Route exact path={'/posts'} component={Posts} />
          <Route path={'/counter'} component={Counter} />
          <Route exact path={'/user'} component={UserList} />
          <Route exact path={'/user/:id'} component={UserPostList} />
          <Route exact path="/posts/:id" component={SinglePostPage} />
          <Route path={'/editPost/:postId'} component={EditPostForm} />
          <Redirect to="/posts"></Redirect>
        </Switch>
      </div>
    </div>
  );
}

export default App;
