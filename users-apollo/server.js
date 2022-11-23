const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const { json } = require('body-parser');
const { typeDefs } = require('./schema/types');
const { resolvers } = require('./schema/resolvers');

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', cors(), json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log('Listening');
  });
}

startApolloServer();
