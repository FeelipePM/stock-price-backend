import axios from 'axios';

export class BrapiCLient {
  async getBySymbol(symbol: string, rangeDate: string) {
    const response = await axios.get(
      `${process.env.BRAPI_URL}quote/${symbol}?range=${rangeDate}&interval=1d&token=${process.env.BRAPI_API_KEY}`,
    );
    return response.data.results;
  }

  async getAllSymbols() {
    const response = await axios.get(`${process.env.BRAPI_URL}quote/list`);
    return response.data.stocks;
  }
}
