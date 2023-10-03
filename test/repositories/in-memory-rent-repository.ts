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

  async mostDelayedBooksPerMonth(
    initialYear?: number | undefined,
    finalYear?: number | undefined,
  ): Promise<{ month: string; year: number; info: string }[]> {
    const delayeds = this.rents.filter((r) => {
      const valid = r.isActive && r.isReturnDelayed();
      if (initialYear || finalYear) {
        const year = r.createdAt.getFullYear();
        const validInitial = initialYear ?? year;
        const validFinal = finalYear ?? year;
        return (
          r.isActive &&
          r.isReturnDelayed() &&
          year >= validInitial &&
          year <= validFinal
        );
      }

      return valid;
    });

    const monthStr = {
      1: 'jan',
      2: 'fev',
      3: 'mar',
      4: 'abr',
      5: 'mai',
      6: 'jun',
      7: 'jul',
      8: 'ago',
      9: 'sep',
      10: 'oct',
      11: 'nov',
      12: 'dez',
    };

    type DelayedReplica = {
      replicaId: string;
      num: number;
    };

    type DelayedPerMonth = {
      month: string;
      year: number;
      replicas: DelayedReplica[];
    };

    const delayedsPerMonth: DelayedPerMonth[] = [];

    for (const d of delayeds) {
      const month: string = monthStr[d.createdAt.getMonth() + 1];
      const year = d.createdAt.getFullYear();

      let dpm = delayedsPerMonth.find(
        (dpm) => dpm.month === month && dpm.year === year,
      );
      if (!dpm) {
        dpm = {
          month,
          year,
          replicas: [],
        };
        delayedsPerMonth.push(dpm);
      }

      let replica = dpm.replicas.find((r) => r.replicaId === d.replicaId);
      if (!replica) {
        replica = {
          replicaId: d.replicaId,
          num: 1,
        };
        dpm.replicas.push(replica);
      } else {
        replica.num = replica.num + 1;
      }
    }

    const response: { month: string; year: number; info: string }[] = [];
    for (const dpm of delayedsPerMonth) {
      const mostDelayedsReplicas = dpm.replicas.sort((a, b) => {
        if (a.num > b.num) return -1;
        if (a.num < b.num) return 1;
        return 0;
      });

      const infoA: Array<string> = [];
      let index: number = 0;
      for (const replica of mostDelayedsReplicas) {
        if (index > 2) break;
        infoA.push(`${replica.replicaId}|${replica.num}`);
        index++;
      }

      const info = infoA.join(';');
      response.push({
        month: dpm.month,
        year: dpm.year,
        info,
      });
    }

    return response;
  }
}
