import { ErrorType } from '@shared/enums';

export class ServiceError extends Error {
  constructor(message: string, public type: ErrorType) {
    super(message);
  }
}
