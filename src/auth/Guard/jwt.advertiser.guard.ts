import { AuthGuard } from '@nestjs/passport';

export class AdvertiserJwtGuard extends AuthGuard('advertiserjwt') {
  constructor() {
    super();
  }
}
