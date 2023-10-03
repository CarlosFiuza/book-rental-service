import { Rent } from '@app/entities/rent';
import { RentRepository } from '@app/repositories/rent-repository';
import { Injectable } from '@nestjs/common';
import {
  ExceededNumLateReturns,
  ReplicaNotAvailabeToRent,
} from './errors/rent-errors';

interface IRentReplicaRequest {
  personId: string;
  replicaId: string;
  createdAt?: Date;
  isActive?: boolean;
  returnedAt?: Date | null;
  expectedReturnAt: Date;
}

interface IRentReplicaResponse {
  rent: Rent;
}

@Injectable()
export class RentReplica {
  constructor(private rentRepository: RentRepository) {}

  async execute(request: IRentReplicaRequest): Promise<IRentReplicaResponse> {
    const { personId, replicaId } = request;

    const replicaAvailable =
      await this.rentRepository.isReplicaAvailableToRent(replicaId);

    if (!replicaAvailable) {
      throw new ReplicaNotAvailabeToRent();
    }

    const limitLateReturns: number = 2;

    const numLateReturns = await this.rentRepository.countLateReturns(personId);

    if (numLateReturns > limitLateReturns) {
      throw new ExceededNumLateReturns(limitLateReturns);
    }

    const rent = new Rent(request);

    await this.rentRepository.create(rent);

    return {
      rent,
    };
  }
}
