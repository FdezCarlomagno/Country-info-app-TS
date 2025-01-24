"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region_Service = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../interfaces/models");
class Region_Service {
    static async getCities(req, res, next) {
        const { country, state } = req.body;
        if (!country && !state) {
            return next(new models_1.CountryError('Specify a country and a state', 400));
        }
        try {
            const { data: cities } = await axios_1.default.post(Region_Service.CITIES_URL, {
                country: country,
                state: state
            });
            if (cities.error) {
                throw new models_1.CountryError('Cities not found', 404);
            }
            return res.json(cities);
        }
        catch (err) {
            next(err);
        }
    }
    static async getCityInfo(req, res, next) {
        const { city: cityName } = req.body;
        if (!cityName) {
            return next(new models_1.CountryError('Specify a city name', 400));
        }
        try {
            const { data: city } = await axios_1.default.post(Region_Service.CITIES_POPULATION_URL, { city: cityName });
            if (city.error) {
                throw new models_1.CountryError('Could not get city', 404);
            }
            return res.json(city.data);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.Region_Service = Region_Service;
Region_Service.CITIES_URL = 'https://countriesnow.space/api/v0.1/countries/state/cities';
Region_Service.CITIES_POPULATION_URL = 'https://countriesnow.space/api/v0.1/countries/population/cities';
