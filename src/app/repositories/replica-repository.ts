import { Replica } from '@app/entities/replica';

export abstract class ReplicaRepository {
  abstract create(replica: Replica): Promise<void>;
  abstract update(replica: Replica): Promise<void>;
  abstract list(): Promise<Replica[] | null>;
  abstract findById(replicaId: string): Promise<Replica | null>;
}
