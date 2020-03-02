import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from 'views/Welcome';
import Main from 'views/Main';
import Buildings from 'views/Buildings';
import Research from 'views/Researches';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Welcome} />
      <Route path='/main' exact component={Main} />
      <Route path='/buildings' exact component={Buildings} />
      <Route path='/research' exact component={Research} />
    </Switch>
  );
}

export default App;
