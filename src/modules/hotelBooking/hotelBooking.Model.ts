import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Bookings {
  id: number;
  name?: string;
  phoneNumber?: string;
  bookingDate?: string;
  hallId?: number;
  userId?:number
}

@Table({
  tableName: 'hotel_booking',
  timestamps: true,
})
export class hotelBooking extends Model<Bookings> implements Bookings {
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


  @IsOptional()
  @Min(11)
  @Max(11)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @IsDateString()
  @IsString()
  @Column({
    field: "booking_Date",
    type: DataType.DATE,
    allowNull: false,
  })
  bookingDate?: string;

  
  @Column({
    field: "hall_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  hallId?: number;

  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}