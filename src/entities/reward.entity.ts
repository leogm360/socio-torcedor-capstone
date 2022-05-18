import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
