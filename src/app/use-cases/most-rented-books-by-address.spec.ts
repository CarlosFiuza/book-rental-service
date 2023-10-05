import { InMemRentRepository } from '@test/repositories/in-memory-rent-repository';
import { MostRentedBooksByAddress } from './most-rented-books-by-address';
import { makeRent } from '@test/factories/rent-factory';
import { randomUUID } from 'crypto';

describe('Most rented books by address', () => {
  let rentRepository: InMemRentRepository;
  let mostRentedBooksByAddress: MostRentedBooksByAddress;

  beforeEach(() => {
    rentRepository = new InMemRentRepository();
    mostRentedBooksByAddress = new MostRentedBooksByAddress(rentRepository);
  });

  it('Should be able to list the most rented books by address and month of a range of years', async () => {
    const replicaId1 = randomUUID();

    const person1 = randomUUID();
    const person2 = randomUUID();
    const person3 = randomUUID();
    const person4 = randomUUID();

    const date1 = new Date('2022-03-05');
    const date2 = new Date('2022-03-15');
    const date3 = new Date('2022-03-25');

    await rentRepository.create(
      makeRent({
        personId: person1,
        replicaId: replicaId1,
        createdAt: date1,
        expectedReturnAt: new Date('2022-03-06'),
        returnedAt: new Date('2022-03-07'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person1,
        replicaId: replicaId1,
        createdAt: date2,
        expectedReturnAt: new Date('2022-03-16'),
        returnedAt: new Date('2022-03-17'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person1,
        replicaId: replicaId1,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person2,
        replicaId: replicaId1,
        createdAt: date1,
        expectedReturnAt: new Date('2022-03-06'),
        returnedAt: new Date('2022-03-07'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person2,
        replicaId: replicaId1,
        createdAt: date2,
        expectedReturnAt: new Date('2022-03-16'),
        returnedAt: new Date('2022-03-17'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person3,
        replicaId: replicaId1,
        createdAt: date2,
        expectedReturnAt: new Date('2022-03-16'),
        returnedAt: new Date('2022-03-17'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person3,
        replicaId: replicaId1,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    await rentRepository.create(
      makeRent({
        personId: person4,
        replicaId: replicaId1,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    const { statistic } = await mostRentedBooksByAddress.execute({});

    expect(rentRepository.rents).toHaveLength(8);
    expect(statistic.at(0)?.year).toEqual(2022);
    expect(statistic.at(0)).toHaveProperty('mar');
    expect(statistic.at(0)?.mar).toHaveLength(3);
    expect(statistic.at(0)?.mar?.at(0)?.bookTitle).toEqual(replicaId1);
  });
});
