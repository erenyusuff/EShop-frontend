export class GetOrders {

  static readonly type = '[Order] Get Orders';

  constructor(public page: number | null ) {
  }
}
