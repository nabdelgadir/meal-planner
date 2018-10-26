import {
  DefaultCrudRepository, HasManyRepositoryFactory, BelongsToAccessor, repository
} from '@loopback/repository';
import { Meal, Food, Kitchen } from '../models';
import { DsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { KitchenRepository } from './kitchen.repository';
import { FoodRepository } from './food.repository';

export class MealRepository extends DefaultCrudRepository<
  Meal,
  typeof Meal.prototype.id
  > {
  public readonly food: HasManyRepositoryFactory<
    Food,
    typeof Meal.prototype.id
    >;

  public readonly kitchen: BelongsToAccessor<
    Kitchen,
    typeof Meal.prototype.id
    >;
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    @repository.getter('KitchenRepository')
    protected kitchenRepositoryGetter: Getter<KitchenRepository>,
    @repository.getter('FoodRepository')
    protected foodRepositoryGetter: Getter<FoodRepository>,
  ) {
    super(Meal, dataSource);
    this.kitchen = this._createBelongsToAccessorFor(
      'kitchenId',
      kitchenRepositoryGetter,
    );
    this.food = this._createHasManyRepositoryFactoryFor(
      'food',
      foodRepositoryGetter,
    );
  }
}
