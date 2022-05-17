import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

@Entity("partnership")
export class Partnership {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column({ type: "float" })
  price: number;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly update_at: Date;

  @OneToMany((type) => User, (user) => user.partnership, { eager: true })
  user: User[];

  @ManyToOne((type) => Reward, (reward) => reward.partnership, { eager: true })
  reward: Reward[];
}
