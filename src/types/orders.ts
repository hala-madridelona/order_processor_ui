export enum OrderStatus {
    ORDER_CREATED = "ORDER_CREATED",

    INVENTORY_RESERVATION_INITIATED = "INVENTORY_RESERVATION_INITIATED",
    INVENTORY_RESERVATION_SUCCEEDED = "INVENTORY_RESERVATION_SUCCEEDED",
    INVENTORY_RESERVATION_FAILED = "INVENTORY_RESERVATION_FAILED",
  
    PAYMENT_INITIATED = "PAYMENT_INITIATED",
    PAYMENT_SUCCEEDED = "PAYMENT_SUCCEEDED",
    PAYMENT_FAILED = "PAYMENT_FAILED",
  
    ORDER_CONFIRMED = "ORDER_CONFIRMED",
    ORDER_FAILED = "ORDER_FAILED",
    ORDER_CANCELLED = "ORDER_CANCELLED",
}

export type OrderEntity = {
    id: string;
    userId: string;
    idempotencyKey: string;
    createdAt: string;
    updatedAt: string,
    status: OrderStatus,
    failureCode: string | null,
    failureReason: string | null
}