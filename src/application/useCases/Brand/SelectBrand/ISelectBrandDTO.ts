import { Brand, IBrand } from "@domain/entities/Brand";

// Request
export interface ISelectBrandDTO extends Pick<IBrand, 'id'> {};

// Response
export class BrandNotFoundErrorResponse extends Error {};
export interface ISelectBrandResponse {
    brand: Brand
}