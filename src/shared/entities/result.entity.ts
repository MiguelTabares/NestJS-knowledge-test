import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Tournament, Player } from './index-entities';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.results)
  player: Player;
}
