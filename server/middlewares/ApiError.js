"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(orinalError, statusCode, message) {
        super(message);
        this.name = this.verifyTypeError(orinalError);
        this.originalError = orinalError;
        this.statusCode = statusCode;
    }
    verifyTypeError(orinalError) {
        if (orinalError) {
            if (orinalError.hasOwnProperty('errors')) {
                return orinalError['errors'][0].message;
            }
            else if (orinalError.hasOwnProperty('details')) {
                return orinalError['details'][0].message;
            }
            else {
                return orinalError;
            }
        }
    }
}
exports.ApiError = ApiError;
