import { ISaveBrandFactory } from '@application/factories/Brand/SaveBrand/ISaveBrandFactory';
import { ISaveBrandResolver } from './ISaveBrandResolver';

const iFactory = new ISaveBrandFactory();
const iUseCase = iFactory.build();
const iResolver = new ISaveBrandResolver(iUseCase);
const iSaveBrand: ISaveBrandResolver = iResolver;

export { iSaveBrand };