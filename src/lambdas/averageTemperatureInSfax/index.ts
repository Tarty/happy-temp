import { APIGatewayProxyResult } from 'aws-lambda';
import { OK } from 'http-status-codes';
import { round } from 'lodash';

import * as sfaxHistoricalData from './data.json';

interface WeatherDataRow {
  date: string,
  temperatureMax: number,
  temperatureMin: number
}

export const averageTemperatureInSfax = async (): Promise<APIGatewayProxyResult> => {
  const days = sfaxHistoricalData.length;
  const averageTemperature = sfaxHistoricalData.reduce(
    (accumulator: number, row: WeatherDataRow): number => {
      const dayAverage: number = round((row.temperatureMin + row.temperatureMax) / 2, 2);

      return accumulator + dayAverage;
    }, 0) / days;

  return {
    body: JSON.stringify({ temperature: averageTemperature }),
    statusCode: OK
  };
};
