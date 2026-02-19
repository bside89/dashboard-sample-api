import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Criar um novo usuário" })
  @ApiResponse({
    status: 201,
    description: "Usuário criado com sucesso",
    type: User,
  })
  @ApiBadRequestResponse({
    description: "Dados inválidos fornecidos",
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({
    status: 200,
    description: "Lista de usuários retornada com sucesso",
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar usuário por ID" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID do usuário",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Usuário encontrado",
    type: User,
  })
  @ApiNotFoundResponse({
    description: "Usuário não encontrado",
  })
  findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar usuário" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID do usuário",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Usuário atualizado com sucesso",
    type: User,
  })
  @ApiNotFoundResponse({
    description: "Usuário não encontrado",
  })
  @ApiBadRequestResponse({
    description: "Dados inválidos fornecidos",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover usuário" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID do usuário",
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: "Usuário removido com sucesso",
  })
  @ApiNotFoundResponse({
    description: "Usuário não encontrado",
  })
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
