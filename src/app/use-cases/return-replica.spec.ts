import { InMemRentRepository } from '@test/repositories/in-memory-rent-repository';
import { ReturnReplica } from './return-replica';
import { makeRent } from '@test/factories/rent-factory';
import { RentNotFound } from './errors/rent-errors';

describe('Return replica', () => {
  let rentRepository: InMemRentRepository;
  let returnReplica: ReturnReplica;

  beforeEach(() => {
    rentRepository = new InMemRentRepository();
    returnReplica = new ReturnReplica(rentRepository);
  });

  it('Should be able to return rent replica', async () => {
    const rent = makeRent();
    await rentRepository.create(rent);

    const { rentId } = await returnReplica.execute({ rentId: rent.id });

    expect(rentRepository.rents.at(0)?.id).toEqual(rentId);
    expect(rentRepository.rents.at(0)?.expectedReturnAt).toBeTruthy();
  });

  it('Should not be able to return a non existing replica', async () => {
    expect(
      async () => await returnReplica.execute({ rentId: 'non existing' }),
    ).rejects.toThrow(RentNotFound);
  });
});
