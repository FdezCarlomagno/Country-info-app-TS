"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const models_1 = require("../interfaces/models");
function errorHandler(err, req, res, next) {
    // Si el error es de tipo `CountryError`, utiliza su información
    if (err instanceof models_1.CountryError) {
        return res.status(err.getStatusCode()).json({ error: err.message });
    }
    // Para otros errores, retorna un mensaje genérico
    return res.status(500).json({ error: "Internal server error" });
}
