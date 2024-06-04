import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tournament, Player } from './index-entities';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  position: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.results)
  player: Player;
}
