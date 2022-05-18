import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Partnership } from "./partnership.entity";

@Entity("rewards")
export class Reward {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly update_at: Date;

  @ManyToOne((type) => Partnership, (partnership) => partnership.rewards)
  partnership: Partnership;
}
