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
import { Food, Meal } from '../models';
import { FoodRepository } from '../repositories';

export class FoodController {
  constructor(
    @repository(FoodRepository)
    public foodRepository: FoodRepository,
  ) { }

  @post('/food', {
    responses: {
      '200': {
        description: 'Food model instance',
        content: { 'application/json': { 'x-ts-type': Food } },
      },
    },
  })
  async create(@requestBody() food: Food): Promise<Food> {
    return await this.foodRepository.create(food);
  }

  @get('/food/count', {
    responses: {
      '200': {
        description: 'Food model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Food)) where?: Where,
  ): Promise<Count> {
    return await this.foodRepository.count(where);
  }

  @get('/food', {
    responses: {
      '200': {
        description: 'Array of Food model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Food } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Food)) filter?: Filter,
  ): Promise<Food[]> {
    return await this.foodRepository.find(filter);
  }

  @patch('/food', {
    responses: {
      '200': {
        description: 'Food PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() food: Food,
    @param.query.object('where', getWhereSchemaFor(Food)) where?: Where,
  ): Promise<Count> {
    return await this.foodRepository.updateAll(food, where);
  }

  @get('/food/{id}', {
    responses: {
      '200': {
        description: 'Food model instance',
        content: { 'application/json': { 'x-ts-type': Food } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Food> {
    return await this.foodRepository.findById(id);
  }

  @patch('/food/{id}', {
    responses: {
      '204': {
        description: 'Food PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() food: Food,
  ): Promise<void> {
    await this.foodRepository.updateById(id, food);
  }

  @del('/food/{id}', {
    responses: {
      '204': {
        description: 'Food DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.foodRepository.deleteById(id);
  }

  @get('/food/{id}/meal', {
    responses: {
      '200': {
        description: 'Meal model instance',
        content: { 'application/json': { 'x-ts-type': Meal } },
      },
    },
  })
  async findOwningList(@param.path.number('id') id: number): Promise<Meal> {
    return await this.foodRepository.meal(id);
  }
}
