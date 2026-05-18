import { Request, Response, NextFunction } from "express";

type AsyncHandlerFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: AsyncHandlerFn) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
