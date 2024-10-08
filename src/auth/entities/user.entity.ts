import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/types/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
  
  @Column()
  name: string;
  
  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    type: 'boolean',
    default: false
  })
  verified: boolean;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password && this.password.length !== 60) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
