import {
  Table,
  PrimaryKey,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';
import Candidate from './candidate.model';
import JobCandidate from './job-candidate.model';
import Recruiter from './recruiter.model';
import JobRecruiter from './job-recruiter.model';

@Table({
  tableName: 'jobs',
  underscored: true,
  timestamps: true,
})
export default class Job extends Model<Job> {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'id' })
  public id: number;

  @Column
  public salary: string;

  @Column
  public company: string;

  @Column
  public description: string;

  @Column
  public requiriments: string;

  @Column
  public benefits: string;

  @Column({ field: 'work_schedule' })
  public workSchedule: string;

  @ForeignKey(() => Recruiter)
  @Column({ field: 'recruiter_id' })
  public recruiterId: string;

  @Column
  public city: string;

  @Column
  public state: string;

  @BelongsToMany(() => Candidate, () => JobCandidate)
  public candidates: Candidate[];

  @BelongsToMany(() => Recruiter, () => JobRecruiter)
  public recruiters: Recruiter[];

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
