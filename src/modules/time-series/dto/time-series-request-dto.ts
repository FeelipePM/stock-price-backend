import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TimeSeriesRequestDto {
  @IsDate()
  @Type(() => Date)
  initialDate: Date;
  @IsDate()
  @Type(() => Date)
  finalDate: Date;
}
