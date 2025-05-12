import { Brand } from '@domain/entities/Brand';
import { ISelectBrandFactoryInMemory } from '@application/factories/Brand/SelectBrand/ISelectBrandFactoryInMemory';
import { ISelectBrandUseCase } from './ISelectBrandUseCase';
import {
  BrandNotFoundErrorResponse,
  ISelectBrandDTO,
  ISelectBrandResponse,
} from './ISelectBrandDTO';

const brand: Brand = {
    id: '5705f099bfab92c2b45536462b0b8aa1c0a91c32bcc61d0ff1f754da79719',
    name: 'Ferrari',
    origin_country: 'Italy',
    founded_at: 1929
}
const brands: Brand[] = [];
brands.push(brand);
describe('Should analyse every possible end related to selecting a brand', () => {
  it('Should select a brand precisely', async () => {
    // Arrange (Given)
    const iFactory = new ISelectBrandFactoryInMemory(brands);
    const sut: ISelectBrandUseCase = iFactory.build();
    const { id }: ISelectBrandDTO = {
      id: '5705f099bfab92c2b45536462b0b8aa1c0a91c32bcc61d0ff1f754da79719',
    };
    // Act (When)
    const response: BrandNotFoundErrorResponse | ISelectBrandResponse =
      await sut.execute({
        id,
      });
    // Assert (Then)
    expect(response).not.toBeInstanceOf(BrandNotFoundErrorResponse);
    expect(response).toHaveProperty('brand');
  });
  it('Should not select a brand', async () => {
    // Arrange (Given)
    const iFactory = new ISelectBrandFactoryInMemory(brands);
    const sut: ISelectBrandUseCase = iFactory.build();
    const { id }: ISelectBrandDTO = {
      id: '5705f099bfab92c2b45536462b0b8aa1c0a91c32bcc61d0asknasasajsas',
    };
    // Act (When)
    const response: BrandNotFoundErrorResponse | ISelectBrandResponse =
      await sut.execute({
        id,
      });
    // Assert (Then)
    expect(response).toBeInstanceOf(BrandNotFoundErrorResponse);
    expect(response).not.toHaveProperty('brand');
  });
});
