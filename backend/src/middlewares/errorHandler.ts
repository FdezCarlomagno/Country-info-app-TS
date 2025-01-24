import { Request, Response, NextFunction } from "express";
import { CountryError } from "../interfaces/models";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): Response {
    // Si el error es de tipo `CountryError`, utiliza su información
    if (err instanceof CountryError) {
        return res.status(err.getStatusCode()).json({ error: err.message });
    }

    // Para otros errores, retorna un mensaje genérico
    return res.status(500).json({ error: "Internal server error" });
}
