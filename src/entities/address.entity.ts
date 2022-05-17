import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class Address {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //   @OneToMany(type => User, user => user.address)
  //   user: User
}
