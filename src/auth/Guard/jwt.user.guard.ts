import { AuthGuard } from '@nestjs/passport';

export class UserJwtGuard extends AuthGuard('userjwt') {
  constructor() {
    super();
  }
}
