import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Reward } from "./reward.entity";
import { User } from "./user.entity";

@Entity("partnerships")
export class Partnership {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column({ type: "float" })
  price: number;

  @OneToMany((type) => User, (user) => user.partnership)
  users: User[];

  @ManyToMany((type) => Reward, { eager: true })
  @JoinTable()
  rewards: Reward[];

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly update_at: Date;
}
