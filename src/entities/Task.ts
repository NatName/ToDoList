import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

export enum statusEnum {
  Done = 'done',
  ToDo = 'todo',
}

@ObjectType({ description: 'The task model' })
export class Task {
    @Field(()=> ID)
    id: string;

    @Field()
    @Property()
    name: string;

    @Field()
    @Property({default: statusEnum.ToDo, enum: statusEnum})
    status: statusEnum;
}

export const TaskModel = getModelForClass(Task);