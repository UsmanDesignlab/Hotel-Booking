import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface User {
  id: number;
  email?: string;

}

@Table({
  tableName: 'email',
  timestamps: true,
})
export class Email extends Model<User> implements User {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsEmail()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email?: string;
}