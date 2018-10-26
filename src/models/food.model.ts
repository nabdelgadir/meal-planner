import { model, property, Entity, belongsTo } from '@loopback/repository';
import { Meal } from './meal.model';

@model()
export class Food extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  unit: string;

  @belongsTo(() => Meal)
  mealId: number;

  getId() {
    return this.id;
  }

  constructor(data?: Partial<Food>) {
    super(data);
  }
}
