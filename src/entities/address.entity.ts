import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  number_house: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @OneToMany((type) => User, (user) => user.address)
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
