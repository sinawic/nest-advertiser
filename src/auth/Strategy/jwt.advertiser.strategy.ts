import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AdvertiserAuthService } from '../service';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class AdvertiserJwtStrategy extends PassportStrategy(
  Strategy,
  'advertiserjwt',
) {
  constructor(
    private authService: AdvertiserAuthService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate({ _id }) {
    const user = await this.authService.getRequesterAdvertiser({ _id })
    return user;
  }
}
