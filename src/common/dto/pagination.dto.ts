import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsNotEmpty()
  page: number;

  @IsPositive()
  @IsNotEmpty()
  paging: number;
}
