import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("user")
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

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly update_at: Date;

  /* @OneToMany((type) => Address, address => address.users, { eager: true })
  @JoinTable()
  address: Address;

  @OneToMany((type) => Partnerships, partnerships => partnerships.users, { eager: true })
  @JoinTable()
  partnership: Partnerships;

  @OneToMany((type) => Club, club => club.users, { eager: true })

 
  @JoinTable()
  club: Club;

  @ManyToMany((type) => Matches, { eager: true })
  @JoinTable()

  matches: Matches[];*/

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
