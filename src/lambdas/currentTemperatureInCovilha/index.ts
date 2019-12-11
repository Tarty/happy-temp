import { APIGatewayProxyResult } from 'aws-lambda';

export const currentTemperatureInCovilha = async (): Promise<APIGatewayProxyResult> => {
  return { body: '42', statusCode: 200 };
};
