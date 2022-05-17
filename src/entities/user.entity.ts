import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne((type) => Address, (address) => user.address, { eager: true })
  @JoinTable()
  address: Address;

  @ManyToOne((type) => Partnerships, (partnership) => user.partnership, {
    eager: true,
  })
  @JoinTable()
  partnership: Partnerships;

  @ManyToOne((type) => Club, (club) => user.club, { eager: true })
  @JoinTable()
  club: Club;

  @ManyToMany((type) => Matches, { eager: true })
  @JoinTable()
  matcher: Matches;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
