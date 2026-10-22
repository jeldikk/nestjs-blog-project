import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

enum State {
  ANDHRA_PRADESH = 'Andhra Pradesh',
  TELANGANA = 'Telangana',
  KARNATAKA = 'Karnataka',
  TAMIL_NADU = 'Tamil Nadu',
  KERALA = 'Kerala',
}

export class UserAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Invalid Place' })
  place: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(State, {
    message: 'State must be from the enum',
  })
  state: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Pincode should be minimum of 3 characters Length',
  })
  pincode: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'firstName should be Minimum of 3 characters',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'lastName should be Minimum of 3 characters',
  })
  lastName: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto;
}
