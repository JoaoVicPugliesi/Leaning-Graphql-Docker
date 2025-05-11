import { IListCarsFactory } from '@application/factories/Car/ListCars/IListCarsFactory';
import { IListCarsResolver } from './IListCarsResolver';

const iFactory = new IListCarsFactory();
const iUseCase = iFactory.build();
const iResolver = new IListCarsResolver(iUseCase);
const iListCars: IListCarsResolver = iResolver;

export { iListCars };