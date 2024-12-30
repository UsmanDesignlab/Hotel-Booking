import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

interface area {
  id: number;
  area?: string;
  locationId?: number;
  userId?: number
}

@Table({
  tableName: 'area',
  timestamps: true,
})
export class Area extends Model<area> implements area {
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
  area?: string;

  @IsInt()
  @Column({
    field: "location_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  locationId?: number;


  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}