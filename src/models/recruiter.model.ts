import {
  Table,
  PrimaryKey,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'recruiters',
  underscored: true,
  timestamps: true,
})
export default class Recruiter extends Model<Recruiter> {
  @PrimaryKey
  @Column({ field: 'id' })
  public id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  public userId: number;

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
