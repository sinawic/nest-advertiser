import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { MarketerAuthService } from '../service';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class MarketerJwtStrategy extends PassportStrategy(
  Strategy,
  'marketerjwt',
) {
  constructor(
    private authService: MarketerAuthService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate({ _id }) {
    const user = await this.authService.getRequesterMarketer({ _id })
    return user;
  }
}
