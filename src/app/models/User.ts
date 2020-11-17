import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  document: string;

  @Column()
  gender: string;

  @Column({ name: 'profile_type' })
  profileType: string;

  @Column('timestamp', { name: 'birth_date' })
  birthDate: Date;

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date;
}

export default User;
