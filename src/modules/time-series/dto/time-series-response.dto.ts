export class TimeSeriesResponseDto {
  symbol: string;
  lastDate: string;
  closeValue: number;
  openValue: number;
  highValue: number;
  historicValues: [
    {
      date: string;
      value: number;
    },
  ];
}
