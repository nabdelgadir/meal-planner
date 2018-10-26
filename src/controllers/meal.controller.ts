import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import { Meal } from '../models';
import { MealRepository, FoodRepository } from '../repositories';
import { FoodController } from './food.controller';

export class MealController {
  constructor(
    @repository(MealRepository)
    public mealRepository: MealRepository,
  ) { }

  @post('/meal', {
    responses: {
      '200': {
        description: 'Meal model instance',
        content: { 'application/json': { 'x-ts-type': Meal } },
      },
    },
  })
  async create(@requestBody() meal: Meal): Promise<Meal> {
    // for (var i in meal.food)
    // await FoodController.create(meal.food[i])
    return await this.mealRepository.create(meal);
  }

  @get('/meal/count', {
    responses: {
      '200': {
        description: 'Meal model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Meal)) where?: Where,
  ): Promise<Count> {
    return await this.mealRepository.count(where);
  }

  @get('/meal', {
    responses: {
      '200': {
        description: 'Array of Meal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Meal } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Meal)) filter?: Filter,
  ): Promise<Meal[]> {
    return await this.mealRepository.find(filter);
  }

  @patch('/meal', {
    responses: {
      '200': {
        description: 'Meal PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() meal: Meal,
    @param.query.object('where', getWhereSchemaFor(Meal)) where?: Where,
  ): Promise<Count> {
    return await this.mealRepository.updateAll(meal, where);
  }

  @get('/meal/{id}', {
    responses: {
      '200': {
        description: 'Meal model instance',
        content: { 'application/json': { 'x-ts-type': Meal } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Meal> {
    return await this.mealRepository.findById(id);
  }

  @patch('/meal/{id}', {
    responses: {
      '204': {
        description: 'Meal PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() meal: Meal,
  ): Promise<void> {
    await this.mealRepository.updateById(id, meal);
  }

  @del('/meal/{id}', {
    responses: {
      '204': {
        description: 'Meal DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mealRepository.deleteById(id);
  }
}
