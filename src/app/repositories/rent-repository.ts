import { Rent } from '@app/entities/rent';

type InfoBooksByDate = {
  month: string;
  year: number;
  info: string;
};

export abstract class RentRepository {
  abstract create(rent: Rent): Promise<void>;
  abstract findById(rentId: string): Promise<Rent | null>;
  abstract update(rent: Rent): Promise<void>;
  abstract findByPersonId(personId: string): Promise<Rent[]>;
  abstract findByReplicasId(replicasId: string[]): Promise<Rent[]>;
  abstract list(): Promise<Rent[]>;
  abstract countLateReturns(personId: string): Promise<number>;
  abstract isReplicaAvailableToRent(replicaId: string): Promise<boolean>;
  abstract mostDelayedBooksByMonth(
    initialYear?: number,
    finalYear?: number,
  ): Promise<InfoBooksByDate[]>;
  abstract mostRentedBooksByAddress(
    initialYear?: number,
    finalYear?: number,
  ): Promise<InfoBooksByDate[]>;
}
