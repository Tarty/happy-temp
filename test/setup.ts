import { cleanAll, isDone, pendingMocks } from 'nock';

jest.setTimeout(15000);

afterEach(
  async (): Promise<void> => {
    jest.clearAllMocks();

    // Verify if all nock mocked endpoints were called.
    if (!isDone()) {
      const pendingEndpoints = pendingMocks();
      cleanAll();

      throw new Error(`Pending mocks detected: ${pendingEndpoints.toString()}.`);
    }
  },
);
