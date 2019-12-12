import { round } from 'lodash';

export default (temperature: number): number => round(temperature - 273.15, 2);