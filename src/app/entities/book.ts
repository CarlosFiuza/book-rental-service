import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';

export interface IBookProps {
  title: string;
  author: string;
  isbn: string;
  createdAt: Date;
  isActive: boolean;
}

export class Book {
  private _id: string;
  private props: IBookProps;

  constructor(
    props: Replace<IBookProps, { createdAt?: Date; isActive?: boolean }>,
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

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return String(this.props.title);
  }

  public set author(author: string) {
    this.props.author = author;
  }

  public get author(): string {
    return String(this.props.author);
  }

  public set isbn(isbn: string) {
    this.props.isbn = isbn;
  }

  public get createdAt() {
    return new Date(this.props.createdAt);
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
