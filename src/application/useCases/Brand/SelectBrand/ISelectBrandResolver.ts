import { ISelectBrandHandler } from '@application/handlers/Resolvers/Brand/ISelectBrandHandler';
import {
  BrandNotFoundErrorResponse,
  ISelectBrandDTO,
  ISelectBrandResponse,
} from './ISelectBrandDTO';
import { ISelectBrandUseCase } from './ISelectBrandUseCase';

export class ISelectBrandResolver {
  constructor(private readonly iSelectBrandUseCase: ISelectBrandUseCase) {}

  async handle({ 
    id 
  }: ISelectBrandDTO): Promise<ISelectBrandHandler> {
    try {
      const response: BrandNotFoundErrorResponse | ISelectBrandResponse =
        await this.iSelectBrandUseCase.execute({
          id,
        });

      if (response instanceof BrandNotFoundErrorResponse) {
        return {
          resolvers: {
            message: 'Brand Not Found',
            code: 404,
          },
        };
      }

      return {
        resolvers: {
            message: 'Brand Found 🚀',
            code: 200,
        },
        brand: response.brand
      }
    } catch (error) {
      return {
        resolvers: {
            message: `Internal Server Error, ${error}`,
            code: 500
        },
      };
    }
  }
}
