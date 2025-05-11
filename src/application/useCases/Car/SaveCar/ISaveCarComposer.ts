import { ISaveCarFactory } from "@application/factories/Car/SaveCar/ISaveCarFactory";
import { ISaveCarResolver } from "./ISaveCarResolver";

const iFactory = new ISaveCarFactory();
const iUseCase = iFactory.build();
const iResolver = new ISaveCarResolver(iUseCase);
const iSaveCar: ISaveCarResolver = iResolver;

export { iSaveCar };