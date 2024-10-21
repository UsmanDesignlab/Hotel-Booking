import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Appointments {
  id: number;
  name?: string;
  phoneNumber?: string;
  bookingDate?: string;
  amount?: number;
  hotelId?: number;
  userId?:number
}

@Table({
  tableName: 'hotelBooking',
  timestamps: true,
})
export class hotelBooking extends Model<Appointments> implements Appointments {
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
    field: "booking_Date",
    type: DataType.DATE,
    allowNull: false,
  })
  bookingDate?: string;

  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount?: number;

  @Column({
    field: "hotel_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  hotelId?: number;

  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}