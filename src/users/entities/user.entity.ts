import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class User {
  @ApiProperty({
    description: "ID único do usuário",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Nome do usuário",
    example: "João Silva",
  })
  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @ApiProperty({
    description: "Data de nascimento",
    example: "1990-01-01",
  })
  @Column({ type: "date", nullable: true })
  birthdate: Date;

  @ApiProperty({
    description: "Data de criação do registro",
    example: "2024-01-01T00:00:00.000Z",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Data de atualização do registro",
    example: "2024-01-01T00:00:00.000Z",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    description: "Função/papel do usuário",
    example: "user",
    default: "user",
  })
  @Column({ type: "varchar", length: 50, default: "user" })
  role: string;

  @ApiProperty({
    description: "Número do documento (CPF/CNPJ)",
    example: "12345678901",
  })
  @Column({ type: "varchar", length: 20, nullable: false, unique: true })
  document_number: string;
}
