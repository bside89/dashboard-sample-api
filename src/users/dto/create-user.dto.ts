import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Nome do usuário",
    example: "João Silva",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Data de nascimento",
    example: "1990-01-01",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @ApiProperty({
    description: "Função/papel do usuário",
    example: "user",
    default: "user",
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({
    description: "Número do documento (CPF/CNPJ)",
    example: "12345678901",
  })
  @IsString()
  @IsNotEmpty()
  document_number: string;
}
