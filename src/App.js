import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from './views/Welcome/Welcome';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Welcome} />
    </Switch>
  );
}

export default App;
