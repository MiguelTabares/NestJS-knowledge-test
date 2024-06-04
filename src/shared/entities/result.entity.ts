import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Player, Tournament } from './index-entities';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  position: number;

  @ManyToOne(() => Player, (player) => player.results)
  player: Player;

  @Column()
  playerId: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournament: Tournament;

  @Column()
  tournamentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column()
  winner: number;

  @Column()
  loser: number;
}
