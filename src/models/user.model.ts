import {
  Table,
  PrimaryKey,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  Unique,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Avatar from './avatar.model';
import Candidate from './candidate.model';
import Recruiter from './recruiter.model';

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column({ field: 'id' })
  public id: number;

  @Unique
  @ForeignKey(() => Candidate)
  @Column({ field: 'candidate_id' })
  public candidateId: number;

  @BelongsTo(() => Candidate)
  public candidate: Candidate;

  @Unique
  @ForeignKey(() => Recruiter)
  @Column({ field: 'recruiter_id' })
  public recruiterId: number;

  @BelongsTo(() => Recruiter)
  public recruiter: Recruiter;

  @HasOne(() => Avatar)
  public avatar: Avatar;

  @Unique
  @Column
  public username: string;

  @Column
  public password: string;

  @Column({ field: 'full_name' })
  public fullName: string;

  @Column
  public email?: string;

  @Column
  public document?: string;

  @AllowNull
  @Column
  public birthDate?: Date;

  @Column
  public city?: string;

  @Column
  public state?: string;

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
