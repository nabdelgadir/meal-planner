import { model, property, Entity, belongsTo, hasMany } from '@loopback/repository';
import { Kitchen } from './kitchen.model';
import { Food } from './food.model';

@model()
export class Meal extends Entity {
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
  type: string;

  @property({
    type: 'string',
  })
  recipe?: string;

  @belongsTo(() => Kitchen)
  kitchenId: number;

  @hasMany(() => Food)
  food: Food[];

  getId() {
    return this.id;
  }

  constructor(data?: Partial<Meal>) {
    super(data);
  }
}
