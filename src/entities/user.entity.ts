import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column()
  adress_id: number;

  @Column()
  partnership_id: number;

  @Column()
  club_id: number;

  @Column()
  matcher_id: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
