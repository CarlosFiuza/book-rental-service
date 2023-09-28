import { Replica } from '@app/entities/replica';
import { ReplicaRepository } from '@app/repositories/replica-repository';

export default class InMemReplicaRepository implements ReplicaRepository {
  public replicas: Replica[] = [];

  async create(replica: Replica): Promise<void> {
    this.replicas.push(replica);
  }
  async update(replica: Replica): Promise<void> {
    const replicaIndex = this.replicas.findIndex((r) => r.id === replica.id);

    if (replicaIndex > -1) {
      this.replicas.splice(replicaIndex, 1, replica);
    }
  }
  async list(): Promise<Replica[] | null> {
    return this.replicas.filter((r) => r.isActive);
  }
  async findById(replicaId: string): Promise<Replica | null> {
    const replica = this.replicas.find((r) => r.id === replicaId);

    return replica ?? null;
  }
}
