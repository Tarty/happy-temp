import { readdirSync } from 'fs';

import * as exportedLambdas from '.';

const lambdas = readdirSync(`${__dirname}/lambdas`);

describe('exports one lambda per directory in the lambdas folder', (): void => {
  it.each(lambdas)('%s should be exported', (directory: string): void => {
    expect.assertions(1);

    expect(exportedLambdas[directory]).toBeDefined();
  });
});