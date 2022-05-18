import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Address } from "./address.entity";
import { Club } from "./club.entity";
import { Partnership } from "./partnership.entity";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  phone: number;

  @ManyToOne((type) => Address, (address) => address.users, { eager: true })
  @JoinTable()
  address: Address;

  @ManyToOne((type) => Partnership, (partnership) => partnership.users, {
    eager: true,
  })
  @JoinTable()
  partnership: Partnership;

  @ManyToOne((type) => Club, (club) => club.users, { eager: true })
  @JoinTable()
  club: Club;

  // @ManyToMany((type) => Matches, { eager: true })
  // @JoinTable()
  // matches: Matches[];

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly update_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
