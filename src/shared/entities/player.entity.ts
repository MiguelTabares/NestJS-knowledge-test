import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Tournament, Result } from './index-entities';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  team: string;

  @Column()
  country: string;

  @ManyToMany(() => Tournament, (tournament) => tournament.players)
  @JoinTable()
  tournaments: Tournament[];

  @OneToMany(() => Result, (result) => result.player)
  results: Result[];
}
