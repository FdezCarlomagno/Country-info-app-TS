"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Configurar dotenv para cargar variables del archivo `.env`.
dotenv_1.default.config();
// Exporta para garantizar que las variables se cargan antes de cualquier otro código.
exports.default = process.env;
