import { Request, Response, NextFunction } from "express";
import { CountryError } from "../interfaces/models";

export function notFoundHandler(req : Request, res : Response, next : NextFunction) : void {
    const error = new CountryError('Url not found, check request method', 404)
    return next(error)
}