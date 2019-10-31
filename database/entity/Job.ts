import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export default class Job {
  @PrimaryColumn()
  id: number;

  @Column()
  salary: number;

  @Column()
  company: string;

  @Column()
  description: string;

  @Column()
  requirements: string;

  @Column()
  workSchedules: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @Column()
  public deletedAt: Date;
}
