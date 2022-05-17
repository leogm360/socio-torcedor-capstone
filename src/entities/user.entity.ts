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

  @OneToMany((type) => Address, { eager: true })
  @JoinTable()
  address_id: Address.id;

  @OneToMany((type) => Partnerships, { eager: true })
  @JoinTable()
  partnership_id: Partnerships.id;

  @OneToMany((type) => Club, { eager: true })
  @JoinTable()
  club_id: Club.id;

  @ManyToMany((type) => Matches, { eager: true })
  @JoinTable()
  matcher_id: Matches.id;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
