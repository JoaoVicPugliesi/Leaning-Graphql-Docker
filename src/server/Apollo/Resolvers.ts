import { iSaveCar } from '@application/useCases/Car/SaveCar/ISaveCarComposer';
import { iListCars } from '@application/useCases/Car/ListCars/IListCarsComposer';
import { iSelectCar } from '@application/useCases/Car/SelectCar/ISelectCarComposer';
import { iSaveBrand } from '@application/useCases/Brand/SaveBrand/ISaveBrandComposer';
import { Car } from '@domain/entities/Car';
import { Brand } from '@domain/entities/Brand';
import { iSelectBrand } from '@application/useCases/Brand/SelectBrand/ISelectBrandComposer';
import { iListBrandedCars } from '@application/useCases/Car/ListBrandedCars/IListBrandedCarsComposer';

export const resolvers = {
  Query: {
    listCars: async (_: any, args: { starts: number, ends: number }) => {
      const { resolvers, cars } = await iListCars.handle({
        ...args,
      });

      return {
        message: resolvers.message,
        code: resolvers.code,
        cars: cars ?? [],
      };
    },

    listBrandedCars: async (_: any, args: { starts: number, ends: number, brand_id: string }) => {
      const { resolvers, cars } = await iListBrandedCars.handle({
        ...args,
      });

      return {
        message: resolvers.message,
        code: resolvers.code,
        cars: cars ?? [],
      };
    },

    selectCar: async (_: any, args: { id: string }) => {
      const { resolvers, car } = await iSelectCar.handle({
        ...args,
      });

      return {
        message: resolvers.message,
        code: resolvers.code,
        car: car ?? {},
      };
    },

    selectBrand: async (_: any, args: { id: string }) => {
  const { resolvers, brand } = await iSelectBrand.handle({
    ...args
  });
  let brandCars: any;
  // Now that we have the brand, we can also fetch its cars
  if (brand) {
    // Fetch cars for the brand by calling the ListBrandedCars use case
    const { cars } = await iListBrandedCars.handle({
      starts: 0,
      ends: 20,
      brand_id: brand.id,
    });

    // Attach the cars to the brand before returning
    brandCars = {
      ...brand,
      cars
    }
  }

  return {
    message: resolvers.message,
    code: resolvers.code,
    brand: brandCars.brand ?? {},
    cars: brandCars?.cars ?? [],
  };
}

  },

  Mutation: {
    saveCar: async (
      _: any,
      args: { name: string, year: number, brand_id: string }
    ) => {
      const { resolvers } = await iSaveCar.handle({
        ...args,
      });

      return {
        message: resolvers.message,
        code: resolvers.code,
      };
    },

    saveBrand: async (
      _: any,
      args: { name: string, origin_country: string, founded_at: number }
    ) => {
      const { resolvers } = await iSaveBrand.handle({
        ...args,
      });

      return {
        message: resolvers.message,
        code: resolvers.code,
      };
    },
  },

  Car: {
    brand: async (parent: Car) => {
      const { brand } = await iSelectBrand.handle({
        id: parent.brand_id
      })

      if(brand) return brand;
    },
  },

  Brand: {
    cars: async (parent: Brand) => {
      const { cars } = await iListBrandedCars.handle({
        starts: 0,
        ends: 20,
        brand_id: parent.id
      })

      return cars ?? [];
    }
  }
};
