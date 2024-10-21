import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Doctors {
  id: number;
  name?: string;
  phoneNumber?: string;
  date?: string
  userId?: number
}

@Table({
  tableName: 'booking',
  timestamps: true,
})
export class Booking extends Model<Doctors> implements Doctors {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name?: string;

  @IsInt()
  @Min(11)
  @Max(11)
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @IsDateString()
  @IsString()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date?: string;


  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

}
