import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';

export interface IRentProps {
  personId: string;
  replicaId: string;
  createdAt: Date;
  isActive: boolean;
  returnedAt?: Date | null;
  expectedReturnAt: Date;
}

export class Rent {
  private _id: string;
  private props: IRentProps;

  constructor(
    props: Replace<
      IRentProps,
      {
        createdAt?: Date;
        modifiedAt?: Date;
        isActive?: boolean;
        isReturned?: boolean;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      isActive: props.isActive === false ? false : true,
      returnedAt: props.returnedAt ?? null,
    };
  }

  public get id(): string {
    return String(this._id);
  }

  public set personId(personId: string) {
    this.props.personId = personId;
  }

  public get personId(): string {
    return String(this.props.personId);
  }

  public set replicaId(replicaId: string) {
    this.props.replicaId = replicaId;
  }

  public get replicaId(): string {
    return String(this.props.replicaId);
  }

  public set expectedReturnAt(expectedReturnAt: Date) {
    this.props.expectedReturnAt = expectedReturnAt;
  }

  public get expectedReturnAt(): Date {
    return new Date(this.props.expectedReturnAt);
  }

  public get returnedAt() {
    return this.props.returnedAt ? new Date(this.props.returnedAt) : null;
  }

  public returned() {
    this.props.returnedAt = new Date();
  }

  public activate() {
    this.props.isActive = true;
  }

  public deactivate() {
    this.props.isActive = false;
  }

  public isReturnDelayed(): boolean {
    const returnDate: Date = this.props.returnedAt ?? new Date();

    return returnDate.getTime() > this.props.expectedReturnAt.getTime();
  }

  public get isActive() {
    return this.props.isActive;
  }
}
