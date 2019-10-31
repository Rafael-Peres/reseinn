import { Entity, Column } from 'typeorm';

@Entity()
export default class Candidate {
  @Column()
  profession: string;

  @Column()
  wageClaim: string;
}
