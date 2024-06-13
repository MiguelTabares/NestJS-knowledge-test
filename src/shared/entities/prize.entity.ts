import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from './player.entity';
import { Assignments } from './assignment.entity';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stock: number;

  @ManyToMany(() => Player, (player) => player.prizes)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Assignments, (assignment) => assignment.prize)
  assignments: Assignments[];
}
