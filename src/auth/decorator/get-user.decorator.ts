import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetAdvertiser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();
    if (data) {
      return request.user;
    }
    return request.user;
  },
);
