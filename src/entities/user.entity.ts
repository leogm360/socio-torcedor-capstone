import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @Column({ name: "user_name" })
  userName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @ManyToOne((type) => Address, (address) => address.users, {
    eager: true,
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn()
  address: Address;

  @ManyToOne((type) => Partnership, (partnership) => partnership.users, {
    eager: true,
  })
  @JoinColumn()
  partnership: Partnership;

  @ManyToOne((type) => Club, (club) => club.users, { eager: true })
  @JoinColumn()
  club: Club;

  // @ManyToMany((type) => Matches, { eager: true })
  // @JoinTable()
  // matches: Matches[];

  @Column({ name: "is_adm" })
  isAdm: boolean;

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
