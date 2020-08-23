import { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-lambda';
import { resolvers, typeDefs } from './resolvers/taskResolver';

connect('mongodb+srv://NatName:TaskToDo11@cluster0.qmjx0.mongodb.net/ToDoList?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false,
  }
});
