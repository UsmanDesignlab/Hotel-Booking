import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Images {
  id: number;
  hotelName?:string;
  hotelImages?:string;
  userId?:number;
}

@Table({
  tableName: 'Image',
  timestamps: true,
})
export class Image extends Model<Images> implements Images {
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
    type: DataType.STRING,
    allowNull: false,
  })
  hotelImages?: string;


  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

}
