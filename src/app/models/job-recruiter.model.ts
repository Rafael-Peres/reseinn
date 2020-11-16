import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import Job from './job.model';
import Recruiter from './recruiter.model';

@Table({
  tableName: 'job_recruiter',
  underscored: true,
})
export default class JobRecruiter extends Model<JobRecruiter> {
  @ForeignKey(() => Job)
  @Column({ field: 'job_id' })
  public jobId: number;

  @ForeignKey(() => Recruiter)
  @Column({ field: 'recruiter_id' })
  public recruiterId: number;
}
