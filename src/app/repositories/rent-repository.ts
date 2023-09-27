import { Rent } from '@app/entities/rent';

export abstract class RentRepository {
  abstract create(person: Rent): Promise<void>;
  abstract findById(personId: string): Promise<Rent | null>;
  abstract update(person: Rent): Promise<void>;
  abstract findByPersonId(personId: string): Promise<Rent[]>;
  abstract findByReplicasId(replicasId: string[]): Promise<Rent[]>;
  abstract list(): Promise<Rent[]>;
}
