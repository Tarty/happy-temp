import { averageTemperatureInSfax } from '.';

describe('happy flows', (): void => {
  it('should return the correct value', async (): Promise<void> => {
    expect.assertions(1);

    const result = await averageTemperatureInSfax();

    expect(result).toStrictEqual({ body: '24', statusCode: 200 });
  });
});