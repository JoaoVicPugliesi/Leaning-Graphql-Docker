import { Car } from '@domain/entities/Car';
import { ResolversHandler } from '../ResolversHandler';

export interface IListCarsResolverHandler {
  resolvers: ResolversHandler,
  cars?: Car[]
}
