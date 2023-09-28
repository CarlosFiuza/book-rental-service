import InMemReplicaRepository from '@test/repositories/in-memory-replica-repository';
import { CreateReplica } from './create-replica';
import { makeReplica } from '@test/factories/replica-factory';

describe('Create replica', () => {
  let replicaRepository: InMemReplicaRepository;
  beforeEach(() => (replicaRepository = new InMemReplicaRepository()));

  it('Should be able to create a replica', async () => {
    const createReplica = new CreateReplica(replicaRepository);

    const { replica } = await createReplica.execute(makeReplica());

    expect(replicaRepository.replicas).toHaveLength(1);
    expect(replicaRepository.replicas.at(0)).toEqual(replica);
  });
});
