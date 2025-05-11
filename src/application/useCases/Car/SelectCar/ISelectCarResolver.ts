import { ISelectCarResolverHandler } from '@application/handlers/Resolvers/Car/ISelectCarResolverHandler';
import {
  CarNotFoundErrorResponse,
  ISelectCarDTO,
  ISelectCarResponse,
} from './ISelectCarDTO';
import { ISelectCarUseCase } from './ISelectCarUseCase';

export class ISelectCarResolver {
  constructor(
    private readonly iSelectCarUseCase: ISelectCarUseCase
  ) {}

  async handle({ 
    id 
  }: ISelectCarDTO): Promise<ISelectCarResolverHandler> {
    try {
      const response: CarNotFoundErrorResponse | ISelectCarResponse =
        await this.iSelectCarUseCase.execute({
          id,
        });
      if (response instanceof CarNotFoundErrorResponse) {
        return {
          resolvers: {
            message: 'Car Not Found',
            code: 404,
          },
        };
      }

      return {
        resolvers: {
            message: 'Car Found 🚀',
            code: 200,
        },
        car: response.car
      }
    } catch (error) {
      return {
        resolvers: {
          message: `Internal Server Error, ${error}`,
          code: 500,
        },
      };
    }
  }
}
