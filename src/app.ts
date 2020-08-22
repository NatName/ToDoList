import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import config from 'config';
import 'reflect-metadata';

import { TaskResolver } from './resolvers/taskResolver';

(async() => {
  const schema = await buildSchema({
    resolvers: [ TaskResolver ],
    emitSchemaFile: true,
    validate: false,
  });

  const mongoose = await connect(config.get('database.url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  await mongoose.connection;

  const server = new ApolloServer({schema});

  const app = Express();

  server.applyMiddleware({app});

  const port = +process.env.PORT || config.get('server.port');
  app.listen({ port }, () =>
    console.log(`Server running on port ${port}`)
  );
})().catch((err) => {
  console.log(err, 'error');
});