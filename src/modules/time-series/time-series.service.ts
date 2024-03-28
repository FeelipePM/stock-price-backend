import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BrapiCLient } from 'src/clients/brapi.client';
import { validateRangeDate } from 'src/helpers/date.helper';
import { TimeSeriesRequestDto } from './dto/time-series-request-dto';
import { TimeSeriesResponseDto } from './dto/time-series-response.dto';
import {
  ResultsResponseDTO,
  HistoricalDataItemDTO,
} from './dto/external-time-series-response.dto';

@Injectable()
export class TimeSeriesService {
  constructor(private readonly brapiCLient: BrapiCLient) {}
  async getBySymbol(
    symbol: string,
    dto: TimeSeriesRequestDto,
  ): Promise<TimeSeriesResponseDto[]> {
    const today = new Date();
    const diffInDays = Math.floor(
      (today.getTime() - dto.initialDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays > 365)
      throw new HttpException(
        'Só é possivel consultar os últimos 12 meses',
        HttpStatus.BAD_REQUEST,
      );

    const rangeDate = validateRangeDate(diffInDays);

    try {
      const data = await this.brapiCLient.getBySymbol(symbol, rangeDate);

      const responseObject = [];

      data.forEach((item: ResultsResponseDTO) => {
        const responseItem = {
          symbol: item.symbol,
          openValue:
            item.historicalDataPrice[item.historicalDataPrice.length - 1].open,
          closeValue:
            item.historicalDataPrice[item.historicalDataPrice.length - 1].close,
          highValue:
            item.historicalDataPrice[item.historicalDataPrice.length - 1].high,
          historicalValues: [],
        };
        item.historicalDataPrice.forEach(
          (historicalItem: HistoricalDataItemDTO) => {
            const itemDate = new Date(historicalItem.date * 1000);
            itemDate.setHours(-3, 0, 0, 0);
            const initialDate = new Date(dto.initialDate);
            const finalDate = new Date(dto.finalDate);
            if (itemDate >= initialDate && itemDate <= finalDate) {
              const dateValues = {
                date: new Date(historicalItem.date * 1000).toLocaleDateString(
                  'pt-BR',
                ),
                close: historicalItem.close,
              };
              responseItem.historicalValues.push(dateValues);
            }
          },
        );
        responseObject.push(responseItem);
      });

      return responseObject;
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllSymbols(): Promise<string[]> {
    try {
      const data = await this.brapiCLient.getAllSymbols();

      const allSymbols = [];
      data.forEach((item: { stock: string }) => allSymbols.push(item.stock));
      return allSymbols;
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
