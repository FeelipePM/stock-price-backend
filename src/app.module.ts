import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeSeriesModule } from './modules/time-series/time-series.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TimeSeriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
