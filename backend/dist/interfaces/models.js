"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryError = void 0;
class CountryError extends Error {
    constructor(message = 'Internal server error', statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    getStatusCode() {
        return this.statusCode;
    }
}
exports.CountryError = CountryError;
