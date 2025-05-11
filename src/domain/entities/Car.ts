export interface ICar {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly brand_id: string;
}

export class Car {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly year: number,
    readonly brand_id: string
  ) {}
}
