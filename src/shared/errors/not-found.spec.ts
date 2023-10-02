import StatusCodes from 'http-status-codes';
import NotFoundError from './not-found';

describe('NotFoundError', () => {
  it('should create an instance of NotFoundError correctly', () => {
    const message = 'Invalid request error';
    const badRequestError = new NotFoundError(message);

    expect(badRequestError.message).toBe(message);
    expect(badRequestError.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
