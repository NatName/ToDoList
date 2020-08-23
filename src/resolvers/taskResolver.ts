import { gql } from 'apollo-server-lambda';
import { TaskModel, statusEnum } from '../entities/Task';

export const typeDefs = gql`
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
    status: String!
  }
`;

interface IInputData {
  name: string;
  status: string;
}

export const resolvers = {
  Mutation: {
    createTask: async(parent: any, args: {data: IInputData }, context: any, info: any) => {
      const task = (await TaskModel.create({
        name: args.data.name,
        status: statusEnum[args.data.status],
      })).save();

      return task;
    },
    deleteTask: async(parent: any, args: { id: any; }, context: any, info: any) => {
      await TaskModel.deleteOne({ _id: args.id });

      return true;
    },
    updateTaskStatus: async(parent: any, args: { id: string; }, context: any, info: any) => {
      const task = await TaskModel.findByIdAndUpdate(
        args.id,
        { $set: { status: statusEnum.Done } }
      );

      return task;
    }
  },
  Query: {
    Tasks: async() => (await TaskModel.find()),
    Task: async(parent: any, args: { id: any; }, context: any, info: any) => {
      return await TaskModel.findById({ _id: args.id });
    },
  }
};

