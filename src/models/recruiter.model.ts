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
import JobRecruiter from './job-recruiter.model';
import Job from './job.model';
import User from './user.model';

@Table({
  tableName: 'recruiters',
  underscored: true,
  timestamps: true,
})
export default class Recruiter extends Model<Recruiter> {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'id' })
  public id: number;

  @BelongsToMany(() => Job, () => JobRecruiter)
  public jobs: Job[];

  @HasOne(() => User)
  public user: User;

  @Column({ field: 'presentation_letter' })
  public presentationLetter: string;

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
