import { Car } from "@domain/entities/Car"

// Request
export interface IListBrandedCarsDTO {
    starts: number,
    ends: number,
    brand_id: string
}

// Response
export class BrandedCarsNotFoundErrorResponse extends Error {};
export interface IListBrandedCarsResponse {
    cars: Car[]
};