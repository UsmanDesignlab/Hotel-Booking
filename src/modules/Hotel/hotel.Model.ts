import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

interface Hotels {
  id: number;
  hotelName?: string;
  phoneNumber?: string;
  userId?: number
}

@Table({
  tableName: 'hotel',
  timestamps: true,
})
export class Hotel extends Model<Hotels> implements Hotels {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Column({
    field: "hotel_name",
    type: DataType.STRING,
    allowNull: false,
  })
  hotelName?: string;

  @IsString()
  @Column({
    field: "phone_number",
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber?: string;


  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}
