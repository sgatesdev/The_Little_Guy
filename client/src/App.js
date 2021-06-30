// libraries
import React from 'react';
import StoreProvider from './store';
import { Router, Route, Switch } from 'react-router-dom'; 

// import apollo client
import { ApolloProvider } from '@apollo/client';

// import apollo client settings
import { client } from './config/apollo';

// custom components/hooks/utils
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Header } from './components/Header';

// import history so we can navigate user around
import history from './config/history';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
