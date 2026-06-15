import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { prismaMock, mailerMock, redisMock, jwtMock, configMock } from "../mock/authService.mock"

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: MailerService, useValue: mailerMock },
        { provide: 'REDIS_CLIENT', useValue: redisMock },
        { provide: JwtService, useValue: jwtMock },
        { provide: ConfigService, useValue: configMock },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it("auth service is Defined", () => {
    expect(service).toBeDefined()
  })

  it("should create user and send code.", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    prismaMock.user.create.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
    });
    mailerMock.sendMail.mockResolvedValue(true);
    redisMock.set.mockResolvedValue(true);


    const result = await service.signUp({
      email: 'test@test.com',
      password: '123456',
      user_name: 'test',
    });

    expect(prismaMock.user.create).toHaveBeenCalled();
    expect(mailerMock.sendMail).toHaveBeenCalled();
    expect(redisMock.set).toHaveBeenCalled();
    expect(result).toBeUndefined();

  })

  it('should throw ConflictException if email exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: '1' });

    await expect(
      service.signUp({
        email: 'test@test.com',
        password: '123456',
        user_name: 'test',
      }),
    ).rejects.toThrow('Email already in use');
  });

  it('should return user payload on login', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
      password: 'hashed',
      is_verify: true,
    });

    jest.spyOn(service, 'verifyPassword').mockResolvedValue(true);

    const result = await service.logIn({
      email: 'test@test.com',
      password: '123456',
    });

    expect(result).toEqual({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
    });
  });


  it('should verify email and return user', async () => {
    redisMock.get.mockResolvedValue('123456');

    prismaMock.user.update.mockResolvedValue(true);
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
    });

    const result = await service.VerificationEmail({
      email: 'test@test.com',
      code: '123456',
    });

    expect(redisMock.del).toHaveBeenCalled();
    expect(prismaMock.user.update).toHaveBeenCalled();
    expect(result?.email).toBe('test@test.com');
  });
  it('should throw ForbiddenException if not verified', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
      password: 'hashed',
      is_verify: false,
    });
    mailerMock.sendMail.mockResolvedValue(true);
    redisMock.set.mockResolvedValue(true);
 
    await expect(
      service.logIn({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('Email not verified');
  });

  it('should verify email and return user', async () => {
    redisMock.get.mockResolvedValue('123456');

    prismaMock.user.update.mockResolvedValue(true);
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      user_name: 'test',
    });

    const result = await service.VerificationEmail({
      email: 'test@test.com',
      code: '123456',
    });

    expect(redisMock.del).toHaveBeenCalled();
    expect(prismaMock.user.update).toHaveBeenCalled();
    expect(result?.email).toBe('test@test.com');
  });

  it('should throw UnauthorizedException for invalid code', async () => {
    redisMock.get.mockResolvedValue(null);

    await expect(
      service.VerificationEmail({
        email: 'test@test.com',
        code: '999999',
      }),
    ).rejects.toThrow('code is invalid or is expire.');
  });



})