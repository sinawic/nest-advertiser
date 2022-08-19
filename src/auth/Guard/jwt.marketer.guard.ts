import { AuthGuard } from '@nestjs/passport';

export class MarketerJwtGuard extends AuthGuard('marketerjwt') {
  constructor() {
    super();
  }
}
