/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

import { Request } from 'express';
import { TextService } from 'src/text/text.service';

@Injectable()
export class TextOwnerGuard implements CanActivate {
  constructor(@Inject(TextService) private readonly textService: TextService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const data = request.body; // Authenticated user from JWT
    const textId = request.params.id; // Get text ID from URL
    console.log(textId, data);

    if (!data || !textId) {
      throw new ForbiddenException('Unauthorized access');
    }

    // Fetch the text record

    const text = await this.textService.findOne(textId);
    if (!text) {
      throw new ForbiddenException('Text not found');
    }
    console.log(text);

    // Check if the current user is the owner
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (text.username !== data.username) {
      throw new ForbiddenException(
        'You do not have permission to view this data',
      );
    }

    return true;
  }
}
