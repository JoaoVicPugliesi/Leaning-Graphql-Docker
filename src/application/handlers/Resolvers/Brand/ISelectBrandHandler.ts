import { Brand } from '@domain/entities/Brand';
import { ResolversHandler } from '../ResolversHandler';

export interface ISelectBrandHandler {
    resolvers: ResolversHandler,
    brand?: Brand
}