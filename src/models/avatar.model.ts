import {
  Table,
  PrimaryKey,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'avatars',
  underscored: true,
  timestamps: true,
})
export default class Avatar extends Model<Avatar> {
  @PrimaryKey
  @Column({ field: 'id' })
  public id: number;

  @Unique
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  public userId: number;

  @BelongsTo(() => User)
  public user: User;

  @Column
  public filename: string;

  @Column
  public extension: string;

  @Column
  public path: string;

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
