
// import express from 'express';
// import path from 'node:path';
// import db from './config/connection.js';
// import routes from './routes/index.js';

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join( '../client/dist')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';

import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateTokenContext } from './services/auth.js';

// Fix for __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

async function startServer() {
  console.log("🚀 Starting Apollo Server...");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Attach Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authenticateTokenContext,
    })
  );

  // Serve static files if in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (_req, res) =>
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
    );
  }

  // MongoDB ready
  if (db.readyState === 1) {
    app.listen(PORT, () => {
      console.log(`🌍 MongoDB connected`);
      console.log(`🚀 GraphQL running at http://localhost:${PORT}/graphql`);
    });
  } else {
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`🌍 MongoDB connected`);
        console.log(`🚀 GraphQL running at http://localhost:${PORT}/graphql`);
      });
    });
  }
}

startServer().catch((err) => {
  console.error('🔥 Server failed to start:', err);
});