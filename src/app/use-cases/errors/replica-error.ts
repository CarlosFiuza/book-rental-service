export class ReplicaNotFound extends Error {
  constructor() {
    super('Replica not exists!');
  }
}
