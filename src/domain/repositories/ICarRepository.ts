import { IListBrandedCarsDTO } from '@application/useCases/Car/ListBrandedCars/IListBrandedCarsDTO';
import { IListCarsDTO } from '@application/useCases/Car/ListCars/IListCarsDTO';
import { ISelectCarDTO } from '@application/useCases/Car/SelectCar/ISelectCarDTO';
import { Car } from '@domain/entities/Car';

export interface ICarRepository {
    save(DTO: Car): Promise<void>;
    view(DTO: Pick<Car, 'name' | 'year'>): Promise<Car | null>;
    list(DTO: IListCarsDTO): Promise<Car[] | null>;
    select(DTO: ISelectCarDTO): Promise<Car | null>;
    listBranded(DTO: IListBrandedCarsDTO): Promise<Car[] | null>;
}