// libraries
import React from 'react';
import StoreProvider from './store';
import { Router, Route, Switch } from 'react-router-dom'; 

// import apollo client
import { ApolloProvider } from '@apollo/client';

// import apollo client settings
import { client } from './config/apollo';

/* MAIN PAGES */
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Messages from './pages/Messages';

/* LANDLORD PAGES */
import Landlord from './pages/landlord';
import AddProperty from './pages/landlord/AddProperty';
import DeleteProperty from './pages/landlord/DeleteProperty';
import EditProperty from './pages/landlord/EditProperty';
import ReviewApplications from './pages/landlord/ReviewApplications';

/* TENANT PAGES */
import Tenant from './pages/tenant';
import TenantSaved from './pages/tenant/TenantSaved';

/* PROFILE PAGES */
import Profile from './pages/profile';
import Password from './pages/profile/UpdatePassword';
import Update from './pages/profile/UpdateProfile';

// header
import Header from './components/Header';

// import history so we can navigate user around
import history from './config/history';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router history={history}>
          <Header />
          <Switch>
            { /* MAIN PATHS */ }
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/messages" component={Messages} />
            { /* LANDLORD PATHS */ }
            <Route exact path="/landlord" component={Landlord} />
            <Route exact path="/landlord/add" component={AddProperty} />
            <Route exact path="/landlord/delete" component={EditProperty} />
            <Route exact path="/landlord/edit" component={DeleteProperty} />
            <Route exact path="/landlord/applications" component={ReviewApplications} />
            { /* USER PATHS */ }
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/update" component={Update} />
            <Route exact path="/profile/password" component={Password} />
            { /* TENANT PATHS */ }
            <Route exact path="/tenant" component={Tenant} />
            <Route path="/tenant/saved" component={TenantSaved} />
          </Switch>
        </Router>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
