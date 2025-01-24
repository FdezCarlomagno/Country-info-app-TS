"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
const models_1 = require("../interfaces/models");
function notFoundHandler(req, res, next) {
    const error = new models_1.CountryError('Url not found, check request method', 404);
    return next(error);
}
