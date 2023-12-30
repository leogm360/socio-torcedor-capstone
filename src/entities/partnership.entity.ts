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
import { User, Reward } from "./";

@Entity("partnerships")
class Partnership {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column({ type: "float" })
  price: number;

  @OneToMany((type) => User, (user) => user.partnership)
  users: User[];

  @ManyToMany((type) => Reward, { eager: true, cascade: ["update"] })
  @JoinTable()
  rewards: Reward[];

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly update_at: Date;
}

export default Partnership;
