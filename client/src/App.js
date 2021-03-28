import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Nav from './components/Nav';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyStories from './pages/MyStories';
import SingleStory from './pages/SingleStory';
import NoteForm from './components/NoteForm';


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
          <Route exact path="/story/:id" component={SingleStory} />
          <Route exact path="/mystories/:username?" component={MyStories} />
          <Route exact path ="/noteform" component={NoteForm} />
      
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
