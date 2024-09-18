import { Request } from 'express';

export interface IRequest extends Request {
  user: {
    enterprise_id: string;
    username: string;
  };
}
