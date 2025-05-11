import { IListBrandedCarsResolver } from './IListBrandedCarsResolver';
import { IListBrandedCarsFactory } from '@application/factories/Car/ListBrandedCars/IListBrandedCarsFactory';

const iFactory = new IListBrandedCarsFactory();
const iUseCase = iFactory.build();
const iResolver = new IListBrandedCarsResolver(iUseCase);
const iListBrandedCars: IListBrandedCarsResolver = iResolver;

export { iListBrandedCars };