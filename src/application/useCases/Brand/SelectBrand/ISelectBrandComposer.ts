import { ISelectBrandFactory } from "@application/factories/Brand/SelectBrand/ISelectBrandFactory";
import { ISelectBrandResolver } from "./ISelectBrandResolver";

const iFactory = new ISelectBrandFactory();
const iUseCase = iFactory.build();
const iResolver = new ISelectBrandResolver(iUseCase);
const iSelectBrand: ISelectBrandResolver = iResolver;

export { iSelectBrand };