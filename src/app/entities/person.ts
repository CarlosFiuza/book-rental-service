import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';

export interface IPersonProps {
  name: string;
  cpf: string;
  dateOfbirth: Date;
  address: string;
  createdAt: Date;
  isActive: boolean;
}

export class Person {
  private _id: string;
  private props: IPersonProps;

  constructor(
    props: Replace<IPersonProps, { createdAt?: Date; isActive?: boolean }>,
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

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return String(this.props.name);
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return String(this.props.cpf);
  }

  public get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  public set dateOfbirth(dateOfbirth: Date) {
    this.props.dateOfbirth = dateOfbirth;
  }

  public get dateOfbirth(): Date {
    return new Date(this.props.dateOfbirth);
  }

  public set address(address: string) {
    this.props.address = address;
  }

  public get address(): string {
    return String(this.props.address);
  }

  public activate() {
    this.props.isActive = true;
  }

  public desactivate() {
    this.props.isActive = false;
  }
}
