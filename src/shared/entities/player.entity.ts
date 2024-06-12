import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Tournament, Result } from './index-entities';
import { Prize } from './prize.entity';
import { Assignments } from './assignment.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => Tournament, (tournament) => tournament.players)
  @JoinTable()
  tournaments: Tournament[];

  @OneToMany(() => Result, (result) => result.winner)
  wins: Result[];

  @OneToMany(() => Result, (result) => result.loser)
  losses: Result[];

  @OneToMany(() => Result, (result) => result.player)
  results: Result[];

  @ManyToMany(() => Prize, (prize) => prize.players)
  @JoinTable()
  prizes: Prize[];

  @Column({ type: 'timestamp', nullable: true })
  claimedAt: Date;

  @OneToMany(() => Assignments, assignment => assignment.player)
  assignments: Assignments[];
}
