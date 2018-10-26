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
import {Kitchen} from '../models';
import {KitchenRepository} from '../repositories';

export class KitchenController {
  constructor(
    @repository(KitchenRepository)
    public kitchenRepository : KitchenRepository,
  ) {}

  @post('/kitchen', {
    responses: {
      '200': {
        description: 'Kitchen model instance',
        content: {'application/json': {'x-ts-type': Kitchen}},
      },
    },
  })
  async create(@requestBody() kitchen: Kitchen): Promise<Kitchen> {
    return await this.kitchenRepository.create(kitchen);
  }

  @get('/kitchen/count', {
    responses: {
      '200': {
        description: 'Kitchen model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Kitchen)) where?: Where,
  ): Promise<Count> {
    return await this.kitchenRepository.count(where);
  }

  @get('/kitchen', {
    responses: {
      '200': {
        description: 'Array of Kitchen model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Kitchen}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Kitchen)) filter?: Filter,
  ): Promise<Kitchen[]> {
    return await this.kitchenRepository.find(filter);
  }

  @patch('/kitchen', {
    responses: {
      '200': {
        description: 'Kitchen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() kitchen: Kitchen,
    @param.query.object('where', getWhereSchemaFor(Kitchen)) where?: Where,
  ): Promise<Count> {
    return await this.kitchenRepository.updateAll(kitchen, where);
  }

  @get('/kitchen/{id}', {
    responses: {
      '200': {
        description: 'Kitchen model instance',
        content: {'application/json': {'x-ts-type': Kitchen}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Kitchen> {
    return await this.kitchenRepository.findById(id);
  }

  @patch('/kitchen/{id}', {
    responses: {
      '204': {
        description: 'Kitchen PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() kitchen: Kitchen,
  ): Promise<void> {
    await this.kitchenRepository.updateById(id, kitchen);
  }

  @del('/kitchen/{id}', {
    responses: {
      '204': {
        description: 'Kitchen DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.kitchenRepository.deleteById(id);
  }
}
