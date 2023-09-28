import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';

export interface IReplicaProps {
  bookId: string;
  createdAt: Date;
  isActive: boolean;
}

export class Replica {
  private _id: string;
  private props: IReplicaProps;

  constructor(
    props: Replace<IReplicaProps, { createdAt?: Date; isActive?: boolean }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      isActive: props.isActive === false ? false : true,
    };
  }

  public get id(): string {
    return String(this._id);
  }

  public set bookId(bookId: string) {
    this.props.bookId = bookId;
  }

  public activate() {
    this.props.isActive = true;
  }

  public desactivate() {
    this.props.isActive = false;
  }

  public get isActive() {
    return this.props.isActive;
  }
}
