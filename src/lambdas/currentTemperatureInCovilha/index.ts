import { APIGatewayProxyResult } from 'aws-lambda';
import { INTERNAL_SERVER_ERROR,OK } from 'http-status-codes';
import { get } from 'lodash';
import fetch from 'node-fetch';

import kelvinToCelsius from '../../common/unitConversion/kelvinToCelsius';
import { COVILHA_ID, WEATHER_API_KEY, WEATHER_API_URI } from '../../configuration';

export const currentTemperatureInCovilha = async (): Promise<APIGatewayProxyResult> => {
  try {
    const temperatureFetch = await fetch(`${WEATHER_API_URI}/weather?id=${COVILHA_ID}&appId=${WEATHER_API_KEY}`);

    if (temperatureFetch.status >= 400) {
      throw new Error('Request to the weather API failed.');
    }

    const temperatureData = await temperatureFetch.json();
    const currentTemperature: number = get(temperatureData, 'main.temp');
    const response = {
      temperature: kelvinToCelsius(currentTemperature),
      timestamp: Math.floor(Date.now() / 100),
    };

    return {
      body: JSON.stringify(response),
      statusCode: OK
    };
  } catch (error) {
    console.error(error);

    return {
      body: JSON.stringify({ error: 'An internal error occurred. Please try again later.' }),
      statusCode: INTERNAL_SERVER_ERROR,
    }
  }
};
