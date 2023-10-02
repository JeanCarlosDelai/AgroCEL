import { Request, Response, NextFunction } from 'express';
import isAuthenticated from './isAuthenticated';
import { verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('isAuthenticated Middleware', () => {
  it('Should be move to next function if token is valid', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid_token_here',
      },
    } as Request;

    const mockResponse = {} as Response;
    const mockNext: NextFunction = jest.fn();

    const tokenPayload = {
      iat: Date.now(),
      exp: Date.now() + 3600,
      sub: 'user_id_here',
    };

    (verify as jest.Mock).mockReturnValue(tokenPayload);

    isAuthenticated(mockRequest, mockResponse, mockNext);

    expect(mockRequest.user).toEqual({ id: tokenPayload.sub });
    expect(mockNext).toHaveBeenCalled();
  });

  it('Should be throw an error if the token is missing', () => {
    const mockRequest = {
      headers: {},
    } as Request;

    const mockResponse = {} as Response;
    const mockNext: NextFunction = jest.fn();

    expect(() => isAuthenticated(mockRequest, mockResponse, mockNext)).toThrow(
      Error,
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('Should be throw an error if the token is invalid', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid_token_here',
      },
    } as Request;

    const mockResponse = {} as Response;
    const mockNext: NextFunction = jest.fn();

    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => isAuthenticated(mockRequest, mockResponse, mockNext)).toThrow(
      Error,
    );
    expect(mockNext).not.toHaveBeenCalled();
  });
});
