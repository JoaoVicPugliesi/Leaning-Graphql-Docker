import { ISelectCarFactory } from '@application/factories/Car/SelectCar/ISelectCarFactory';
import { ISelectCarResolver } from './ISelectCarResolver';

const iFactory = new ISelectCarFactory();
const iUseCase = iFactory.build();
const iResolver = new ISelectCarResolver(iUseCase);
const iSelectCar: ISelectCarResolver = iResolver;

export { iSelectCar };