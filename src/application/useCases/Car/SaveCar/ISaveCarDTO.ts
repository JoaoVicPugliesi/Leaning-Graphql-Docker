import { ICar } from '@domain/entities/Car';

// Request
export interface ISaveCarDTO extends Omit<ICar, 'id'> {};

// Response
export class CarAlreadyExistsErrorResponse extends Error {};
export interface ISaveCarResponse {
    success: boolean
}