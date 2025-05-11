import { Brand } from '@domain/entities/Brand';
import { ISaveBrandDTO } from '@application/useCases/Brand/SaveBrand/ISaveBrandDTO';
import { ISelectBrandDTO } from '@application/useCases/Brand/SelectBrand/ISelectBrandDTO';

export interface IBrandRepository {
    save(DTO: Brand): Promise<void>;
    view(DTO: Pick<ISaveBrandDTO, 'name'>): Promise<Brand | null>;
    select(DTO: ISelectBrandDTO): Promise<Brand | null>;
}