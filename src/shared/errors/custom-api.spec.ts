import CustomAPIError from './custom-api';

describe('CustomAPIError', () => {
  it('should create an instance of BadRequestError correctly', () => {
    const errorMessage = 'Invalid request error';
    const customAPIError = new CustomAPIError(errorMessage);

    expect(customAPIError).toBeInstanceOf(Error);
    expect(customAPIError.message).toBe(errorMessage);
  });
});
