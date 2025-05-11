import { Car } from '@domain/entities/Car';
import { ResolversHandler } from '../ResolversHandler';

export interface IListBrandedCarsResolverHandler {
  resolvers: ResolversHandler,
  cars?: Car[]
}
