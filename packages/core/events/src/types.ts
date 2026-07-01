export interface EventStoreTypes {
  [key: string]: any;
}

export enum EventStatus {
  PENDING = 'PENDING',
  COMMITTED = 'COMMITTED',
  REPLAYED = 'REPLAYED'
}

export interface EventMetadata {
  status: EventStatus;
  committedAt?: number;
}
