import { Replica, IReplicaProps } from '@app/entities/replica';
import { randomUUID } from 'node:crypto';

type Override = Partial<IReplicaProps>;

export function makeReplica(override: Override = {}) {
  return new Replica({
    bookId: randomUUID(),
    createdAt: new Date(),
    isActive: true,
    ...override,
  });
}
