import { Module } from '@nestjs/common';
import { TimeSeriesService } from './time-series.service';
import { TimeSeriesController } from './time-series.controller';
import { BrapiCLient } from 'src/clients/brapi.client';

@Module({
  controllers: [TimeSeriesController],
  providers: [TimeSeriesService, BrapiCLient],
  exports: [TimeSeriesService],
})
export class TimeSeriesModule {}
