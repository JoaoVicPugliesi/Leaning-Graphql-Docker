import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Car {
    id: ID
    name: String
    year: Int
    brand_id: ID!
    brand: Brand,
  }

  type Brand {
    id: ID,
    name: String,
    origin_country: String,
    founded_at: Int,
    cars: [Car]!
  }

  type ResolverResponse {
    message: String!
    code: Int!
    cars: [Car]
    car: Car
    brand: Brand
  }

  type Query {
    listCars(starts: Int!, ends: Int!): ResolverResponse
    listBrandedCars(starts: Int!, ends: Int!, brand_id: ID!): ResolverResponse
    selectCar(id: ID!): ResolverResponse
    selectBrand(id: ID!): ResolverResponse
  }

  type Mutation {
    saveBrand(name: String!, origin_country: String!, founded_at: Int!): ResolverResponse
    saveCar(name: String!, year: Int!, brand_id: ID!): ResolverResponse
  }
  
`;
