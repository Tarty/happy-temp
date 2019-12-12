import { OK } from 'http-status-codes';

import { averageTemperatureInSfax } from '.';

describe('happy flows', (): void => {
  it('returns the expected average temperature value', async (): Promise<void> => {
    expect.assertions(2);

    const { body, statusCode } = await averageTemperatureInSfax();

    expect(statusCode).toBe(OK);
    expect(JSON.parse(body)).toStrictEqual({ temperature: 25.4 });
  });
});
