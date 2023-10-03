import { RentRepository } from '@app/repositories/rent-repository';
import { Injectable } from '@nestjs/common';
import { RentNotFound } from './errors/rent-errors';

interface IReturnReplicaRequest {
  rentId: string;
}

interface IReturnReplicaResponse {
  rentId: string;
}

@Injectable()
export class ReturnReplica {
  constructor(private rentRepository: RentRepository) {}

  async execute(
    request: IReturnReplicaRequest,
  ): Promise<IReturnReplicaResponse> {
    const { rentId } = request;

    const rent = await this.rentRepository.findById(rentId);

    if (!rent) {
      throw new RentNotFound();
    }

    rent.returned();

    await this.rentRepository.update(rent);

    return {
      rentId,
    };
  }
}
