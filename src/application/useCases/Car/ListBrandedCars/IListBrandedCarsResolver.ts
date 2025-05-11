import { IListBrandedCarsResolverHandler } from '@application/handlers/Resolvers/Car/IListBrandedCarsResolverHandler';
import {
  BrandedCarsNotFoundErrorResponse,
  IListBrandedCarsDTO,
  IListBrandedCarsResponse,
} from './IListBrandedCarsDTO';
import { IListBrandedCarsUseCase } from './IListBrandedCarsUseCase';

export class IListBrandedCarsResolver {
  constructor(
    private readonly iListBrandedCarsUseCase: IListBrandedCarsUseCase
  ) {}

  async handle({ 
    starts, 
    ends,
    brand_id
  }: IListBrandedCarsDTO): Promise<IListBrandedCarsResolverHandler> {
    try {
      const response: BrandedCarsNotFoundErrorResponse | IListBrandedCarsResponse =
        await this.iListBrandedCarsUseCase.execute({
          starts,
          ends,
          brand_id
        });

      if (response instanceof BrandedCarsNotFoundErrorResponse) {
        return {
          resolvers: {
            message: 'Branded Cars not Found',
            code: 404,
          }
        };
      }

      return {
        resolvers: {
          message: 'Branded Cars Found 🚀',
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
