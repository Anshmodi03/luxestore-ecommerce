import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // Auth0 JWT errors
  if (err.name === 'UnauthorizedError' || err.name === 'InvalidTokenError') {
    res.status(401).json({
      error: 'Invalid or expired token',
    });
    return;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation error',
      details: err.message,
    });
    return;
  }

  // Mongoose duplicate key errors
  if ((err as any).code === 11000) {
    res.status(409).json({
      error: 'Duplicate entry',
    });
    return;
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    error: env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
};
