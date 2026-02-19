import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { NotFoundException } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    name: "Test User",
    birthdate: new Date("1990-01-01"),
    role: "user",
    document_number: "12345678901",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
    find: jest.fn().mockReturnValue(Promise.resolve([mockUser])),
    findOne: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
    remove: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a user", async () => {
      const createUserDto = {
        name: "Test User",
        birthdate: new Date("1990-01-01"),
        role: "user",
        document_number: "12345678901",
      };

      const result = await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        order: { created_at: "DESC" },
      });
      expect(result).toEqual([mockUser]);
    });
  });

  describe("findOne", () => {
    it("should return a user", async () => {
      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });

    it("should throw NotFoundException if user not found", async () => {
      jest.spyOn(repository, "findOne").mockReturnValue(Promise.resolve(null));

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove", () => {
    it("should remove a user", async () => {
      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
    });
  });
});
