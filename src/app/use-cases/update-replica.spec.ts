import { makeReplica } from '@test/factories/replica-factory';
import InMemReplicaRepository from '@test/repositories/in-memory-replica-repository';
import { UpdateReplica } from './update-replica';
import { ReplicaNotFound } from './errors/replica-error';

describe('Update replica', () => {
  let replicaRepository: InMemReplicaRepository;
  let updateReplica: UpdateReplica;

  beforeEach(() => {
    replicaRepository = new InMemReplicaRepository();
    updateReplica = new UpdateReplica(replicaRepository);
  });

  it('Should be able to update replica', async () => {
    const replica = makeReplica();

    await replicaRepository.create(replica);

    replica.bookId = 'bookId - 2';
    replica.desactivate();

    const { replica: updatedReplica } = await updateReplica.execute(replica);

    expect(replicaRepository.replicas).toHaveLength(1);
    expect(replicaRepository.replicas.at(0)).toEqual(updatedReplica);
  });

  it('Should not be able to update non existing replica', async () => {
    expect(
      async () => await updateReplica.execute({ id: 'not exists id' }),
    ).rejects.toThrow(ReplicaNotFound);
  });
});
