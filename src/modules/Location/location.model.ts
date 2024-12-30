import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

interface locations {
  id: number;
  location?: string;
  hotelId?: number;
  userId?: number
}

@Table({
  tableName: 'location',
  timestamps: true,
})
export class Location extends Model<locations> implements locations {
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
  location?: string;

  @IsInt()
  @Column({
    field: "hotel_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  hotelId?: number;


  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}