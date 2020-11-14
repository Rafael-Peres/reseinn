import {
  Table,
  PrimaryKey,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  HasOne,
  AutoIncrement,
} from 'sequelize-typescript';
import Job from './job.model';
import JobCandidate from './job-candidate.model';
import Curriculum from './curriculum.model';
import User from './user.model';

@Table({
  tableName: 'candidates',
  underscored: true,
  timestamps: true,
})
export default class Candidate extends Model<Candidate> {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'id' })
  public id: number;

  @BelongsToMany(() => Job, () => JobCandidate)
  public jobs: Job[];

  @HasOne(() => Curriculum)
  public curriculum: Curriculum;

  @HasOne(() => User)
  public user: User;

  @Column
  public profession: string;

  @Column({ field: 'level_training' })
  public levelTraining: string;

  @Column
  public pretense: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  public createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  public updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  public deletedAt: Date;
}
