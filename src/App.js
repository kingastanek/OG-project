import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from './views/Welcome';
import Main from './views/Main';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Welcome} />
      <Route path='/main' exact component={Main} />
    </Switch>
  );
}

export default App;
