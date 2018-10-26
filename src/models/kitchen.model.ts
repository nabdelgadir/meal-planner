import { Model, model, property, Entity, hasMany } from '@loopback/repository';
import { Meal } from './meal.model';

@model()
export class Kitchen extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Meal)
  meals: Meal[];

  constructor(data?: Partial<Kitchen>) {
    super(data);
  }
}
