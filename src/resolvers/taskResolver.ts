import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Task, TaskModel, statusEnum } from '../entities/Task';
import { TaskInput } from './types/taskInput';

@Resolver()
export class TaskResolver {

  @Query(_returns => Task, { nullable: false})
  async Task(@Arg('id') id: string){

    return await TaskModel.findById({_id:id});
  }


  @Query(() => [Task])
  async Tasks(){

    return await TaskModel.find();
  }

  @Mutation(() => Task)
  async createTask(@Arg('data'){ name, status }: TaskInput): Promise<Task> {
    const task = (await TaskModel.create({
      name,
      status
    })).save();

    return task;
  }


  @Mutation(() => Boolean)
  async deleteTask(@Arg('id') id: string) {
    await TaskModel.deleteOne({ _id: id });

    return true;
  }

  @Mutation(() => Task)
  async updateTaskStatus(@Arg('id') id: string): Promise<Task> {
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { $set: { status: statusEnum.Done } }
    );

    return task;
  }

}