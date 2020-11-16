import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import Job from './job.model';
import Candidate from './candidate.model';

@Table({
  tableName: 'job_candidates',
  underscored: true,
})
export default class JobCandidate extends Model<JobCandidate> {
  @ForeignKey(() => Job)
  @Column({ field: 'job_id' })
  public jobId: number;

  @ForeignKey(() => Candidate)
  @Column({ field: 'candidate_id' })
  public candidateId: number;
}
