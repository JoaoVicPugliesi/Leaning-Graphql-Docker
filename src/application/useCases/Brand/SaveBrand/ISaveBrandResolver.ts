import { ISaveBrandHandler } from '@application/handlers/Resolvers/Brand/ISaveBrandHandler';
import {
  BrandAlreadyExistsErrorResponse,
  ISaveBrandDTO,
  ISaveBrandResponse,
} from './ISaveBrandDTO';
import { ISaveBrandUseCase } from './ISaveBrandUseCase';

export class ISaveBrandResolver {
  constructor(
    private readonly iSaveBrandUseCase: ISaveBrandUseCase
  ) {}

  async handle({
    name,
    origin_country,
    founded_at,
  }: ISaveBrandDTO): Promise<ISaveBrandHandler> {
    try {
      const response: BrandAlreadyExistsErrorResponse | ISaveBrandResponse  =
        await this.iSaveBrandUseCase.execute({
          name,
          origin_country,
          founded_at,
        });

      if(response instanceof BrandAlreadyExistsErrorResponse) {
        return {
          resolvers: {
            message: 'Brand Already Exists',
            code: 409
          }
        }
      }

      return {
        resolvers: {
          message: 'Brand Saved 🚀',
          code: 201
        }
      }
    } catch (error) {
      return {
        resolvers: {
          message: `Internal Server Error, ${error}`,
          code: 500
        }
      }
    }
  }
}
