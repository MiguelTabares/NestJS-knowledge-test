import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Player } from './player.entity';
import { Prize } from './prize.entity';

@Entity()
export class Assignments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, player => player.assignments)
  player: Player;

  @ManyToOne(() => Prize, prize => prize.assignments)
  prize: Prize;

  @CreateDateColumn()
  fecha: Date;
}
