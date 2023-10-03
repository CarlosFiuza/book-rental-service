export class ExceededNumLateReturns extends Error {
  constructor(num: number) {
    super(`Exceeded limit of ${num} late returns`);
  }
}

export class ReplicaNotAvailabeToRent extends Error {
  constructor() {
    super('Replica is not available to rent');
  }
}

export class RentNotFound extends Error {
  constructor() {
    super('Rent not found');
  }
}
