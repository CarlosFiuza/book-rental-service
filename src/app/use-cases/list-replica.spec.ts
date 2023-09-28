import InMemReplicaRepository from '@test/repositories/in-memory-replica-repository';
import { ListReplica } from './list-replica';
import { makeReplica } from '@test/factories/replica-factory';

describe('List replica', () => {
  let replicaRepository: InMemReplicaRepository;

  beforeEach(() => (replicaRepository = new InMemReplicaRepository()));

  it('Should be able to list replicas', async () => {
    await replicaRepository.create(makeReplica({ bookId: '123' }));
    await replicaRepository.create(makeReplica({ bookId: '1234' }));
    await replicaRepository.create(makeReplica({ bookId: '12345' }));
    await replicaRepository.create(makeReplica({ bookId: '123456' }));

    const listReplica = new ListReplica(replicaRepository);

    const { replicas } = await listReplica.execute();

    expect(replicaRepository.replicas).toHaveLength(4);
    expect(replicaRepository.replicas).toEqual(replicas);
  });
});
