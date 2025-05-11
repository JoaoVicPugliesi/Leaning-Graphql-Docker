import { Car, ICar } from '@domain/entities/Car';

// Request
export interface ISelectCarDTO extends Pick<ICar, 'id'> {};

// Response
export class CarNotFoundErrorResponse extends Error {};
export interface ISelectCarResponse {
    car: Car
}