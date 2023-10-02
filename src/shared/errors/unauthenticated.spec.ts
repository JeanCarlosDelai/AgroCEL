import StatusCodes from 'http-status-codes';
import UnauthenticatedError from './unauthenticated';

describe('NotFoundError', () => {
  it('should create an instance of NotFoundError correctly', () => {
    const message = 'Invalid request error';
    const badRequestError = new UnauthenticatedError(message);

    expect(badRequestError.message).toBe(message);
    expect(badRequestError.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});
