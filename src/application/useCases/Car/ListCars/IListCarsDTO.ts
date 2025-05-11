import { Car } from "@domain/entities/Car"

// Request
export interface IListCarsDTO {
    starts: number,
    ends: number
}

// Response
export class CarsNotFoundErrorResponse extends Error {};
export interface IListCarsResponse {
    cars: Car[]
};