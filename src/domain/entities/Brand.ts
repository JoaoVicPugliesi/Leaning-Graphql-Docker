export interface IBrand {
  readonly id: string;
  readonly name: string;
  readonly origin_country: string;
  readonly founded_at: number;
}

export class Brand implements IBrand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly origin_country: string,
    readonly founded_at: number
  ) {}
}
