import {
  CarAlreadyExistsErrorResponse,
  ISaveCarDTO,
  ISaveCarResponse,
} from "./ISaveCarDTO";
import { ISaveCarUseCase } from "./ISaveCarUseCase";
import { ISaveCarResolverHandler } from "@application/handlers/Resolvers/Car/ISaveCarResolverHandler";

export class ISaveCarResolver {
  constructor(
    private readonly iSaveCarUseCase: ISaveCarUseCase
  ) {}

  async handle({ 
    name, 
    year, 
    brand_id }: ISaveCarDTO): Promise<ISaveCarResolverHandler> {
    try {
      const response: CarAlreadyExistsErrorResponse | ISaveCarResponse =
        await this.iSaveCarUseCase.execute({
          name,
          year,
          brand_id,
        });

      if (response instanceof CarAlreadyExistsErrorResponse) {
        return {
          resolvers: {
            message: 'Car Already Exists',
            code: 409
          }
        };
      }

      return {
        resolvers: {
          message: 'Car Saved',
          code: 201
        }
      };
    } catch (error) {
      return {
        resolvers: {
          message: `Internal Server Error ${error}`,
          code: 500
        }
      }
    }
  }
}
