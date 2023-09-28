import { ReplicaRepository } from '@app/repositories/replica-repository';
import { Injectable } from '@nestjs/common';
import { ReplicaNotFound } from './errors/replica-error';
import { Replica } from '@app/entities/replica';

interface IUpdateReplicaRequest {
  id: string;
  bookId?: string;
  isActive?: boolean;
}

interface IUpdateReplicaResponse {
  replica?: Replica;
}

@Injectable()
export class UpdateReplica {
  constructor(private replicaRepository: ReplicaRepository) {}

  async execute(
    request: IUpdateReplicaRequest,
  ): Promise<IUpdateReplicaResponse> {
    const { id: replicaId, bookId, isActive } = request;

    const replica = await this.replicaRepository.findById(replicaId);

    if (!replica) {
      throw new ReplicaNotFound();
    }

    if (bookId) {
      replica.bookId = bookId;
    }

    if (isActive === false) {
      replica.desactivate();
    } else if (isActive) {
      replica.activate();
    }

    await this.replicaRepository.update(replica);

    return {
      replica,
    };
  }
}
