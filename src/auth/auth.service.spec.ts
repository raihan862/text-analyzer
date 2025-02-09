import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      // Mock Keycloak's response for successful login
      const mockResponse: AxiosResponse = {
        data: {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          expires_in: 3600,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: new AxiosHeaders() },
        request: {},
      };
      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      const result = await authService.login('admin', 'admin123');
      console.log({ result });

      expect(result).toHaveProperty('access_token', 'mock_access_token');
      expect(result).toHaveProperty('refresh_token', 'mock_refresh_token');
    });

    it('should throw UnauthorizedException if invalid credentials are provided', async () => {
      // Mock failed login response
      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() =>
          throwError(() => new UnauthorizedException()),
        );

      try {
        await authService.login('invalid_user', 'wrong_pass');
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
