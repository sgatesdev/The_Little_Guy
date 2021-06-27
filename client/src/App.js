// libraries
import React from 'react';
import StoreProvider from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

// custom components/hooks/utils
import { Home } from './pages/Home';

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
