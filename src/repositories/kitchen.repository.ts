import {
  DefaultCrudRepository, HasManyRepositoryFactory, juggler, repository
} from '@loopback/repository';
import { Kitchen, Meal } from '../models';
import { DsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { MealRepository } from './meal.repository';

export class KitchenRepository extends DefaultCrudRepository<
  Kitchen,
  typeof Kitchen.prototype.id
  > {
  public readonly meal: HasManyRepositoryFactory<
    Meal,
    typeof Kitchen.prototype.id
    >;

  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    @repository.getter('MealRepository')
    protected mealRepositoryGetter: Getter<MealRepository>,
  ) {
    super(Kitchen, dataSource);
    // this.meal = this._createHasManyRepositoryFactoryFor(
    //   'meal',
    //   mealRepositoryGetter,
    // );
  }
}
