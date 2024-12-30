import { Table, Column, Model, DataType, IsIn } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


enum UserSession {
  Morning = "Morning",
  Evening = "Evening"
}

enum UserFloor {
  First = "First",
  Second = "Second"
}

enum UserCategory {
  Premium = "Premium",
  Simple = "Simple"
}

interface area {
  id?: number;
  capacity?: number;
  session?: string;
  category?: string;
  date?: string;
  floor?: string;
  amount?: number;
  areaId?: number;
  userId?: number;
  isAvailable?: boolean;
}

@Table({
  tableName: 'hall_details',
  timestamps: true,
})
export class Hall extends Model<area> implements area {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Min(50, { message: "Minimum 50" })
  @Max(150, { message: "Maximum 150" })
  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity?: number;


  @IsEnum(UserSession, {
    message: 'Session must be either "Morning" or "Evening".'
  })
  @IsString()
  @Column({
    type: DataType.ENUM(UserSession.Morning, UserSession.Evening),
    allowNull: false,
  })
  session?: string;


  @IsEnum(UserFloor, {
    message: 'Floor must be either "First" or "Second".'
  })
  @IsString()
  @Column({
    type: DataType.ENUM(UserFloor.First, UserFloor.Second),
    allowNull: false,
  })
  floor?: string;


  @IsEnum(UserCategory, {
    message: 'Category must be either "Premium" or "Simple".'
  })
  @IsString()
  @Column({
    type: DataType.ENUM(UserCategory.Premium, UserCategory.Simple),
    allowNull: false,
  })
  category?: string;

  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount?: number;


  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date?: string;

  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @Column({
    field: "area_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  areaId?: number;

  @Column({
    field: "is_available",
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  isAvailable?: boolean;

}