export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad request") { super(400, message); }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not found") { super(404, message); }
}
