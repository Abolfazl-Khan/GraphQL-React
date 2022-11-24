const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const { json } = require('body-parser');
const { typeDefs } = require('./schema/types');
const { resolvers } = require('./schema/resolvers');

const app = express();
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use('/graphql', cors(), json(), expressMiddleware(server));
}
startApolloServer();

app.listen(4000, () => {
  console.log('Listening');
});
