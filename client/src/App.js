import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// add these two library import statements
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import MyStories from './pages/MyStories';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Signup';
import SingleStory from './pages/SingleStory';

const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/mystories/:username?" component={MyStories} />
      <Route exact path="/story/:id" component={SingleStory} />

      <Route component={PageNotFound} />
      </Switch>
      </div>
      <Footer />
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
