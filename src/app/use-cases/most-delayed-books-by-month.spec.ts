import { InMemRentRepository } from '@test/repositories/in-memory-rent-repository';
import { MostDelayedBooksByMonth } from './most-delayed-books-by-month';
import { randomUUID } from 'crypto';
import { makeRent } from '@test/factories/rent-factory';

describe('Most delayed books by month', () => {
  let rentRepository: InMemRentRepository;
  let mostDelayedBooksByMonth: MostDelayedBooksByMonth;

  beforeEach(() => {
    rentRepository = new InMemRentRepository();
    mostDelayedBooksByMonth = new MostDelayedBooksByMonth(rentRepository);
  });

  it('Should be able to return statistics about delayed books by month', async () => {
    const replicaId1 = randomUUID();
    const replicaId2 = randomUUID();
    const replicaId3 = randomUUID();
    const replicaId4 = randomUUID();

    const date1 = new Date('2022-03-05');
    const date2 = new Date('2022-03-15');
    const date3 = new Date('2022-03-25');

    await rentRepository.create(
      makeRent({
        replicaId: replicaId1,
        createdAt: date1,
        expectedReturnAt: new Date('2022-03-06'),
        returnedAt: new Date('2022-03-07'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId1,
        createdAt: date2,
        expectedReturnAt: new Date('2022-03-16'),
        returnedAt: new Date('2022-03-17'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId1,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId2,
        createdAt: date1,
        expectedReturnAt: new Date('2022-03-06'),
        returnedAt: new Date('2022-03-07'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId2,
        createdAt: date2,
        expectedReturnAt: new Date('2022-03-16'),
        returnedAt: new Date('2022-03-17'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId2,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId3,
        createdAt: date2,
        expectedReturnAt: new Date('2022-03-16'),
        returnedAt: new Date('2022-03-17'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId3,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    await rentRepository.create(
      makeRent({
        replicaId: replicaId4,
        createdAt: date3,
        expectedReturnAt: new Date('2022-03-26'),
        returnedAt: new Date('2022-03-27'),
      }),
    );

    const { statistic } = await mostDelayedBooksByMonth.execute({});

    expect(rentRepository.rents).toHaveLength(9);
    expect(statistic.at(0)?.year).toEqual(2022);
    expect(statistic.at(0)).toHaveProperty('mar');
    expect(statistic.at(0)?.mar).toHaveLength(3);
    expect(statistic.at(0)?.mar?.at(0)?.bookTitle).toEqual(replicaId1);
  });
});
