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
import { Landlord } from './pages/landlord';
import { Tenant } from './pages/tenant';
import { Messages } from './pages/Messages';

import { LandlordProfile } from './pages/landlord/LandlordProfile';
import { TenantProfile } from './pages/tenant/TenantProfile';

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
            <Route exact path="/landlord" component={Landlord} />
            <Route exact path="/landlord/profile" component={LandlordProfile} />
            <Route exact path="/tenant" component={Tenant} />
            <Route exact path="/tenant/profile" component={TenantProfile} />
            <Route exact path="/messages" component={Messages} />
          </Switch>
        </Router>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
