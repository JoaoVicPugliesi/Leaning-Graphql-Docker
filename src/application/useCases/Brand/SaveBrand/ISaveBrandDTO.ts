import { IBrand } from '@domain/entities/Brand';

// Request
export interface ISaveBrandDTO extends Omit<IBrand, 'id'> {};

// Response 
export class BrandAlreadyExistsErrorResponse extends Error {};
export interface ISaveBrandResponse {
    success: boolean
}