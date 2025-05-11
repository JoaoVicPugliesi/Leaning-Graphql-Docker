import { ISelectBrandDTO } from '@application/useCases/Brand/SelectBrand/ISelectBrandDTO';
import { Brand } from '@domain/entities/Brand';
import { IBrandRepository } from '@domain/repositories/IBrandRepository';

export class InMemoryBrandRepository implements IBrandRepository {
  constructor(
    private readonly brands: Brand[]
  ) {}

  async save({ 
    id, 
    name, 
    origin_country, 
    founded_at 
  }: Brand): Promise<void> {
    this.brands.push({
      id,
      name,
      origin_country,
      founded_at,
    });
  }

  async view({ 
    name 
  }: Pick<Brand, 'name'>): Promise<Brand | null> {
    const brand: Brand | undefined = this.brands.find(
      (i: Brand) => i.name === name
    );

    if (brand) return brand;

    return null;
  }

  async select({
    id
  }: ISelectBrandDTO): Promise<Brand | null> {
    const brand: Brand | undefined = this.brands.find((i: Brand) => 
      i.id === id
    );

    if(brand) return brand;

    return null;
  }
}
