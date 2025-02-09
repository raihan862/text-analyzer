import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  login(username: string, password: string) {
    const keycloakTokenUrl =
      'http://localhost:8080/realms/text-analyzer/protocol/openid-connect/token';
    const clientId = 'nestjs-oauth-client';
    const clientSecret = 'my-client-secret';

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('username', username);
    params.append('password', password);

    return firstValueFrom(
      this.httpService
        .post<AxiosResponse>(keycloakTokenUrl, params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .pipe(
          map((response) => response.data),
          catchError(() => {
            throw new UnauthorizedException();
          }),
        ),
    );
  }
}
