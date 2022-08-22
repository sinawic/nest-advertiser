import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'

export const AdvertizerDecorator = createParamDecorator((
  data: string | undefined,
  ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  if (!user.verified)
    throw new HttpException('Ask an admin to verify you', HttpStatus.UNAUTHORIZED)
  if (!user.active)
    throw new HttpException('Ask an admin to activate you', HttpStatus.UNAUTHORIZED)
  return user;
});
