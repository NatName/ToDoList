import { InputType, Field, registerEnumType  } from 'type-graphql';
import { Task, statusEnum } from '../../entities/Task';

registerEnumType(statusEnum, {
  name: 'statusEnum',
  description: 'status for task',
});

@InputType()
export class TaskInput implements Partial<Task> {

  @Field()
  name: string;

  @Field(type => statusEnum)
  status?: statusEnum;

}