import { Replica } from '@app/entities/replica';
import { ReplicaRepository } from '@app/repositories/replica-repository';
import { Injectable } from '@nestjs/common';

interface ICreateReplicaRequest {
  bookId: string;
  createdAt?: Date;
  isActive?: boolean;
}

interface ICreateReplicaResponse {
  replica: Replica;
}

@Injectable()
export class CreateReplica {
  constructor(private replicaRepository: ReplicaRepository) {}

  async execute(
    request: ICreateReplicaRequest,
  ): Promise<ICreateReplicaResponse> {
    const replica = new Replica(request);

    await this.replicaRepository.create(replica);

    return {
      replica,
    };
  }
}
