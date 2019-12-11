import  { currentTemperatureInCovilha } from '.';

describe('happy flows', (): void => {
  it('should return the correct value', async (): Promise<void> => {
    expect.assertions(1);

    const result = await currentTemperatureInCovilha();

    expect(result).toStrictEqual({ body: '42', statusCode: 200 });
  });
});