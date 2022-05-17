import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("club")
export class Club {
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

  /*@ManyToOne(type => Partnership, partnership => partnership.reward)
    partnership: Partnership*/
}
