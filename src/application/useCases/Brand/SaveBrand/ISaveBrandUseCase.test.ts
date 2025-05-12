import { ISaveBrandFactoryInMemory } from '@application/factories/Brand/SaveBrand/ISaveBrandFactoryInMemory';
import { Brand } from '@domain/entities/Brand';
import { ISaveBrandUseCase } from './ISaveBrandUseCase';
import {
  BrandAlreadyExistsErrorResponse,
  ISaveBrandDTO,
  ISaveBrandResponse,
} from './ISaveBrandDTO';

const brands: Brand[] = [];
describe('Should analyse every possible end related to saving a brand', () => {
  it('Should save a brand precisely', async () => {
    // Arrange (Given)
    const iFactory = new ISaveBrandFactoryInMemory(brands);
    const sut: ISaveBrandUseCase = iFactory.build();
    const { name, origin_country, founded_at }: ISaveBrandDTO = {
      name: 'Ferrari',
      origin_country: 'Italy',
      founded_at: 1929,
    };
    // Act (When)
    const response: BrandAlreadyExistsErrorResponse | ISaveBrandResponse =
      await sut.execute({
        name,
        origin_country,
        founded_at,
      });
    // Assert (Then)
    expect(response).not.toBeInstanceOf(BrandAlreadyExistsErrorResponse);
    expect(response).toHaveProperty('success');
  });
  it('Should not save a brand', async () => {
    // Arrange (Given)
    const iFactory = new ISaveBrandFactoryInMemory(brands);
    const sut: ISaveBrandUseCase = iFactory.build();
    const { name, origin_country, founded_at }: ISaveBrandDTO = {
      name: 'Ferrari',
      origin_country: 'Italy',
      founded_at: 1929,
    };
    // Act (When)
    const response: BrandAlreadyExistsErrorResponse | ISaveBrandResponse =
      await sut.execute({
        name,
        origin_country,
        founded_at,
      });
    // Assert (Then)
    expect(response).toBeInstanceOf(BrandAlreadyExistsErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
});
