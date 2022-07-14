import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserAuthService } from '../service';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  'userjwt',
) {
  constructor(
    private userAuthService: UserAuthService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate({ _id }) {
    const user = await this.userAuthService.getRequesterUser({ _id })
    return user;
  }
}
