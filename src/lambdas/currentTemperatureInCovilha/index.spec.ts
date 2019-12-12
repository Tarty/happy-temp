import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import * as nock from 'nock';

import { COVILHA_ID } from '../../configuration';
import { currentTemperatureInCovilha } from '.';

jest.spyOn(Date, 'now').mockReturnValue(123400);
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('error flows', (): void => {
  it('logs the error and returns a correct error message if something went wrong', async (): Promise<void> => {
    expect.assertions(3);

    // Arrange
    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query({ appId: '', id: COVILHA_ID })
      .reply(BAD_REQUEST, {});

    // Act
    const { statusCode, body } = await currentTemperatureInCovilha();

    // Assert)
    expect(consoleErrorSpy.mock.calls[0][0].toString()).toBe('Error: Request to the weather API failed.');
    expect(statusCode).toBe(INTERNAL_SERVER_ERROR);
    expect(JSON.parse(body)).toStrictEqual({
      error: 'An internal error occurred. Please try again later.'
    });
  });
});

describe('happy flows', (): void => {
  it('returns with the expected response', async (): Promise<void> => {
    expect.assertions(2);

    // Arrange
    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query({ appId: '', id: COVILHA_ID })
      .reply(OK, { main: { temp: 303.8 } });

    // Act
    const { statusCode, body } = await currentTemperatureInCovilha();

    // Assert
    expect(statusCode).toBe(OK);
    expect(JSON.parse(body)).toStrictEqual({
      temperature: 30.65,
      timestamp: 1234
    });
  });
});
