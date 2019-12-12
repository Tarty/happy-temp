import { get } from 'lodash';


export const WEATHER_API_KEY = get(process.env, 'WEATHER_API_KEY', '') as string;
export const WEATHER_API_URI = 'https://api.openweathermap.org/data/2.5';
export const COVILHA_ID = '2740313';

