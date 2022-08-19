import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const MarketerDecorator = createParamDecorator((
  data: string | undefined,
  ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  if (user.level)
    return user;
  throw new HttpException('Ask an admin to assign you a level', HttpStatus.UNAUTHORIZED);
});
