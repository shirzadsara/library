export class CreateOrderDto {
  userId!: number;
  bookId!: number;
  quantity!: number;
}

export class UpdateOrderDto {
  quantity?: number;
}
