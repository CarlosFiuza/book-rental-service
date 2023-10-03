import { makeRent } from '@test/factories/rent-factory';
import { InMemRentRepository } from '@test/repositories/in-memory-rent-repository';
import { RentReplica } from './rent-replica';
import {
  ExceededNumLateReturns,
  ReplicaNotAvailabeToRent,
} from './errors/rent-errors';
import { randomUUID } from 'node:crypto';

describe('Rent replica', () => {
  let rentRepository: InMemRentRepository;
  let rentReplica: RentReplica;

  beforeEach(() => {
    rentRepository = new InMemRentRepository();
    rentReplica = new RentReplica(rentRepository);
  });

  it('Should be able to rent a replica', async () => {
    const { rent } = await rentReplica.execute(makeRent());

    expect(rentRepository.rents).toHaveLength(1);
    expect(rentRepository.rents.at(0)).toEqual(rent);
  });

  it('Should not be able to rent a replica to a person that exceeded num of late returns', async () => {
    const minDate = new Date(-8640000000000000);
    const personId = randomUUID();
    await rentRepository.create(
      makeRent({ expectedReturnAt: minDate, personId }),
    );
    await rentRepository.create(
      makeRent({ expectedReturnAt: minDate, personId }),
    );
    await rentRepository.create(
      makeRent({ expectedReturnAt: minDate, personId }),
    );

    expect(
      async () => await rentReplica.execute(makeRent({ personId })),
    ).rejects.toThrow(ExceededNumLateReturns);
  });

  it('Should not be able to rent a replica that is already rented', async () => {
    const rent = makeRent();
    await rentRepository.create(rent);

    const anotherRent = makeRent({ replicaId: rent.replicaId });

    expect(async () => await rentReplica.execute(anotherRent)).rejects.toThrow(
      ReplicaNotAvailabeToRent,
    );
  });
});
