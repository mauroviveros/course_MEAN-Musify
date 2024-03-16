import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongooseError } from 'mongoose';

@Catch(MongooseError)
export class MongooseErrorFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;

    if (exception.name === 'ValidationError') status = 400;

    return response.status(status).json(exception);
  }
}
