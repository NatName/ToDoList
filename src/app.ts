import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import 'reflect-metadata';

import { TaskResolver } from './resolvers/taskResolver';

(async() => {
  const schema = await buildSchema({
    resolvers: [ TaskResolver ],
    emitSchemaFile: true,
    validate: false,
  });

  const mongoose = await connect('mongodb+srv://NatName:TaskToDo11@cluster0.qmjx0.mongodb.net/ToDoList?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  await mongoose.connection;

  const server = new ApolloServer({schema});

  const app = Express();

  server.applyMiddleware({app});

  const port = +process.env.PORT || 3000;
  app.listen({ port }, () =>
    console.log(`Server running on port ${port}`)
  );
})().catch((err) => {
  console.log(err, 'error');
});