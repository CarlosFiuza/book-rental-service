export class ExceededNumLateReturns extends Error {
  constructor(num: number) {
    super(`Exceeded limit of ${num} late returns`);
  }
}
