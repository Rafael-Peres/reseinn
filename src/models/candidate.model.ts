import {
  Table,
  PrimaryKey,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import User from './user.model';
import Job from './job.model';
import JobCandidate from './job-candidate.model';

@Table({
  tableName: 'candidates',
  underscored: true,
  timestamps: true,
})
export default class Candidate extends Model<Candidate> {
  @PrimaryKey
  @Column({ field: 'id' })
  public id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  public userId: number;

  @BelongsToMany(() => Job, () => JobCandidate)
  public jobs: Job[];

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
