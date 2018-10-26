import {
  DefaultCrudRepository, juggler, BelongsToAccessor, repository
} from '@loopback/repository';
import { Food, Meal } from '../models';
import { DsDataSource } from '../datasources';
import { Getter, inject } from '@loopback/core';
import { MealRepository } from './meal.repository';

export class FoodRepository extends DefaultCrudRepository<
  Food,
  typeof Food.prototype.id
  > {
  public readonly meal: BelongsToAccessor<
    Meal,
    typeof Food.prototype.id
    >;
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    @repository.getter('MealRepository')
    protected mealRepositoryGetter: Getter<MealRepository>,
  ) {
    super(Food, dataSource);

    this.meal = this._createBelongsToAccessorFor(
      'mealId',
      mealRepositoryGetter,
    );
  }

}
