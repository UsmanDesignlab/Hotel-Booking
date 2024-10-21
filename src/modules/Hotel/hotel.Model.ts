import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

enum UserCategory {
  Premium = "Premium",
  Simple = "Simple"
}

enum UserSession {
  Morning = "Morning",
  Evening = "Evening"
}

interface Patients {
  id: number;
  hotelName?: string;
  phoneNumber?: string;
  location?: string;
  userId?: number
  category?: string;
  capacity?: number;
  amount?: number;
  availableDate?: string;
  session?: string;
}

@Table({
  tableName: 'hotelDetails',
  timestamps: true,
})
export class Hotel extends Model<Patients> implements Patients {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Column({
    field: "hotel_Name",
    type: DataType.STRING,
    allowNull: false,
  })
  hotel_Name?: string;

  @IsInt()
  @Min(11)
  @Max(11)
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location?: string;

  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount?: number;

  @IsString()
  @Column({
    field: "available_Date",
    type: DataType.DATE,
    allowNull: false,
  })
  availableDate?: string;


  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity?: number;

  @IsEnum(UserCategory)
  @IsString()
  @Column({
    type: DataType.ENUM(UserCategory.Premium, UserCategory.Simple),
    allowNull: true,
  })
  category!: string;

  @IsEnum(UserSession)
  @IsString()
  @Column({
    type: DataType.ENUM(UserSession.Morning, UserSession.Evening),
    allowNull: true,
  })
  session!: string;

  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}
