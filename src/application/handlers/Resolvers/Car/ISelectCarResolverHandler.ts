import { Car } from "@domain/entities/Car";
import { ResolversHandler } from "../ResolversHandler";

export interface ISelectCarResolverHandler {
  resolvers: ResolversHandler,
  car?: Car
}
