import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player, Result } from './index-entities';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  ubication: string;

  @Column()
  description: string;

  @OneToMany(() => Player, (player) => player.tournaments)
  players: Player[];

  @OneToMany(() => Result, (result) => result.tournament)
  results: Result[];
}
