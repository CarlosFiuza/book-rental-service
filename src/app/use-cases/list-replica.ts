import { ReplicaRepository } from '@app/repositories/replica-repository';
import { Injectable } from '@nestjs/common';
import { Replica } from '@app/entities/replica';

interface IListReplicaResponse {
  replicas?: Replica[] | null;
}

@Injectable()
export class ListReplica {
  constructor(private replicaRepository: ReplicaRepository) {}

  async execute(): Promise<IListReplicaResponse> {
    const replicas = await this.replicaRepository.list();

    return {
      replicas: replicas ?? null,
    };
  }
}
