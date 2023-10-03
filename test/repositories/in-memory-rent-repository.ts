import { Rent } from '@app/entities/rent';
import { RentRepository } from '@app/repositories/rent-repository';

export class InMemRentRepository implements RentRepository {
  public rents: Rent[] = [];

  async create(rent: Rent): Promise<void> {
    this.rents.push(rent);
  }
  async findById(rentId: string): Promise<Rent | null> {
    const rent = this.rents.find((r) => r.id === rentId);

    return rent ?? null;
  }
  async update(rent: Rent): Promise<void> {
    const rentIndex = this.rents.findIndex((r) => r.id === rent.id);

    if (rentIndex > -1) {
      this.rents.splice(rentIndex, 1, rent);
    }
  }
  async findByPersonId(personId: string): Promise<Rent[]> {
    return this.rents.filter((r) => r.personId === personId && r.isActive);
  }
  async findByReplicasId(replicasId: string[]): Promise<Rent[]> {
    return this.rents.filter(
      (r) => replicasId.includes(r.replicaId) && r.isActive,
    );
  }
  async list(): Promise<Rent[]> {
    return this.rents.filter((r) => r.isActive);
  }
  async countLateReturns(personId: string): Promise<number> {
    const lateReturns = this.rents.filter(
      (r) => r.personId === personId && r.isReturnDelayed() && r.isActive,
    );

    return lateReturns.length;
  }
  async isReplicaAvailableToRent(replicaId: string): Promise<boolean> {
    const notAvailable = this.rents.some(
      (r) => r.replicaId === replicaId && !r.returnedAt && r.isActive,
    );

    return !notAvailable;
  }
}
