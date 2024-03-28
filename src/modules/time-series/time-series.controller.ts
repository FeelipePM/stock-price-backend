import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TimeSeriesService } from './time-series.service';
import { TimeSeriesRequestDto } from './dto/time-series-request-dto';

@Controller('time-series')
export class TimeSeriesController {
  constructor(private readonly timeSeriesService: TimeSeriesService) {}

  @Post(':symbol')
  findBySymbol(
    @Param('symbol') symbol: string,
    @Body() dto: TimeSeriesRequestDto,
  ) {
    return this.timeSeriesService.getBySymbol(symbol, dto);
  }

  @Get('/symbols')
  findAll() {
    return this.timeSeriesService.getAllSymbols();
  }
}
