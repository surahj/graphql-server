import express from 'express';
import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

const app = express();

async function startApolloServer() {
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    cors(),
    express.json(),
    expressMiddleware(server, '/graphql'),
  );

  await ((resolve) => httpServer.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000`);
}

console.log(1)
startApolloServer();
console.log(1)

app.get('/', (req, res) => {
  res.json("Welcome to Apollo Server");
})
console.log(1)