import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

import Nav from './components/Nav';

import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyStories from './pages/MyStories';
import SingleStory from './pages/SingleStory';
import PageNotFound from './pages/PageNotFound';


const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/mystories/:username?" component={MyStories} />
          <Route exact path="/story/:id" component={SingleStory} />
          
              
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
