import { APIGatewayProxyResult } from 'aws-lambda';

export const averageTemperatureInSfax = async (): Promise<APIGatewayProxyResult> => {
  return { body: '24', statusCode: 200 };
};
