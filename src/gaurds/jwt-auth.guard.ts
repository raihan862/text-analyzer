/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwksClient;
  private readonly issuer: string;

  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {
    this.issuer = this.configService.get<string>('KEYCLOAK_ISSUER') as string;

    this.jwksClient = jwksClient({
      jwksUri: `${this.issuer}/protocol/openid-connect/certs`,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const getKey = (header, callback) => {
      this.jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err, 'Error getting signing key');
        callback(null, key?.getPublicKey());
      });
    };
    let user;
    try {
      user = await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          getKey,
          {
            algorithms: ['RS256'],
            issuer: this.issuer,
            ignoreExpiration: true,
          },
          (err, decoded) => {
            if (err) {
              reject(err);
            }
            resolve(decoded);
          },
        );
      });
    } catch (err) {
      console.log(err);
    }

    if (user) {
      request['body'] = request.body
        ? { ...request.body, username: user.preferred_username }
        : { username: user.preferred_username };
      return true;
    }

    return false;
  }
}
