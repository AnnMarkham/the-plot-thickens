const path = require('path');
const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

const { authMiddleware } = require('./utils/auth');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// create a new Apollo server and pass in our schema data
//context authMiddleware assures that every requrest performs authentication check and the updated request object is passed to resolvers as context. 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//from here to db.once = sets up ability of back end server's code to serv up React front-end code
// requires path and code in root package.json if-env
// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
