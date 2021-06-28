// libraries
import React from 'react';
import StoreProvider from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

// import apollo client
import { ApolloProvider } from '@apollo/client';

// import apollo client settings
import { client } from './config/apollo';

// custom components/hooks/utils
import { Home } from './pages/Home';
import { Login } from './pages/Login';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
