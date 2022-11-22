import { registerEnumType } from "@nestjs/graphql";

export enum Category {
    SEDAN = 'sedan',
    COUPE = 'coupe',
    SUV = 'suv',
  }
  registerEnumType(Category, {
    name: 'Category',
  });