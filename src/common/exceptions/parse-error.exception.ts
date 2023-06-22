export class ParseError extends Error {
    constructor(message: string, public readonly originalError?: Error) {
      super(message);
      this.name = 'ParseError';
  
      // Set the prototype explicitly to allow proper instanceof checks
      Object.setPrototypeOf(this, ParseError.prototype);
    }
  }