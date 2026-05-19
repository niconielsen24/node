import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction): void {
  console.log(`${req.method} ${req.url}`);
  console.log(`${JSON.stringify(req.body)}`);
  console.log(`${JSON.stringify(req.params)}`);
  next();
}