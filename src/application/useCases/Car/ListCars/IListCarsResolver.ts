import {
  CarsNotFoundErrorResponse,
  IListCarsDTO,
  IListCarsResponse,
} from './IListCarsDTO';
import { IListCarsUseCase } from './IListCarsUseCase';
import { IListCarsResolverHandler } from '@application/handlers/Resolvers/Car/IListCarsResolverHandler';

export class IListCarsResolver {
  constructor(
    private readonly iListCarsUseCase: IListCarsUseCase
  ) {}

  async handle({ 
    starts, 
    ends
  }: IListCarsDTO): Promise<IListCarsResolverHandler> {
    try {
      const response: CarsNotFoundErrorResponse | IListCarsResponse =
        await this.iListCarsUseCase.execute({
          starts,
          ends
        });

      if (response instanceof CarsNotFoundErrorResponse) {
        return {
          resolvers: {
            message: 'Cars not Found',
            code: 404,
          }
        };
      }

      return {
        resolvers: {
          message: 'Cars Found 🚀',
          code: 200
        },
        cars: response.cars
      };
    } catch (error) {
      return {
        resolvers: {
          message: `Internal Server Error ${error}`,
          code: 500,
        }
      };
    }
  }
}
