// import Express from 'express';
// import { ApolloServer } from 'apollo-server-express';
// import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-lambda';

import 'reflect-metadata';

import { TaskResolver } from './resolvers/taskResolver';

connect('mongodb+srv://NatName:TaskToDo11@cluster0.qmjx0.mongodb.net/ToDoList?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const typeDefs = gql`
  type Mutation {
    createTask(data: TaskInput!): Task!
    deleteTask(id: String!): Boolean!
    updateTaskStatus(id: String!): Task!
  }

  type Query {
    Task(id: String!): Task!
    Tasks: [Task!]!
  }

  enum statusEnum {
    Done
    ToDo
  }

  type Task {
    id: ID!
    name: String!
    status: String!
  }

  input TaskInput {
    name: String!
    status: statusEnum!
  }
`;

const server = new ApolloServer({ typeDefs, resolvers: [ TaskResolver ] });

exports.handler = server.createHandler();
