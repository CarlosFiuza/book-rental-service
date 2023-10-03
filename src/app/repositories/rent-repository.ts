import { Rent } from '@app/entities/rent';

export abstract class RentRepository {
  abstract create(rent: Rent): Promise<void>;
  abstract findById(rentId: string): Promise<Rent | null>;
  abstract update(rent: Rent): Promise<void>;
  abstract findByPersonId(personId: string): Promise<Rent[]>;
  abstract findByReplicasId(replicasId: string[]): Promise<Rent[]>;
  abstract list(): Promise<Rent[]>;
  abstract countLateReturns(personId: string): Promise<number>;
  abstract isReplicaAvailableToRent(replicaId: string): Promise<boolean>;
}
