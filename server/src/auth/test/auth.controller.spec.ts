import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { authServiceMock } from '../mock/authController.mock';

describe('AuthController', () => {
    let controller: AuthController;



    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call signup service', async () => {
        authServiceMock.signUp.mockResolvedValue(undefined);

        const dto = {
            email: 'test@test.com',
            password: '123456',
            user_name: 'ahmed',
        };

        await controller.signup(dto);

        expect(authServiceMock.signUp).toHaveBeenCalledTimes(1);
        expect(authServiceMock.signUp).toHaveBeenCalledWith(dto);
    });

    it('should login user and return access token', async () => {
        authServiceMock.logIn.mockResolvedValue({
            id: '1',
            email: 'test@test.com',
            user_name: 'ahmed',
        });

        authServiceMock.generateRefreshAndAccessTokens.mockResolvedValue({
            access: 'access-token',
            refresh: 'refresh-token',
        });

        const res = {
            cookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.logIn(
            {
                email: 'test@test.com',
                password: '123456',
            },
            res as any,
        );

        expect(authServiceMock.logIn).toHaveBeenCalled();
        expect(authServiceMock.generateRefreshAndAccessTokens).toHaveBeenCalled();

        expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            accessToken: 'access-token',
        });
    });

    it('should clear refresh token cookie', async () => {
        const res = {
            clearCookie: jest.fn(),
        };

        const result = await controller.logout(res);

        expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');

        expect(result).toEqual({
            message: 'Logged out',
        });
    });
});