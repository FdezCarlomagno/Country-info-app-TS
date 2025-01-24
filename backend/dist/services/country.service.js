"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country_Service = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../interfaces/models");
/**
 * Service class for handling country-related data retrieval.
 */
class Country_Service {
    /**
     * Creates a standardized API response.
     * @template T - Type of the data returned.
     * @param {boolean} error - Indicates if there was an error.
     * @param {string} msg - Message describing the response.
     * @param {T | []} data - Data returned in the response.
     * @returns {ApiResponse<T>} - Standardized API response.
     */
    static createResponse(error, msg, data) {
        return { error, msg, data };
    }
    /**
     * Retrieves a list of all available countries.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<Response | void>} - List of countries or error.
     */
    static async getCountries(req, res, next) {
        try {
            const { data: countries } = await axios_1.default.get(Country_Service.AVAILABLE_COUNTRIES_URL);
            if (!Array.isArray(countries) || countries.length === 0) {
                throw new models_1.CountryError('Could not fetch countries', 404);
            }
            const response = Country_Service.createResponse(false, 'Countries fetched', countries);
            return res.json(response);
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * Retrieves detailed information about a country.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<Response | void>} - Country information or error.
     */
    static async getCountryInfo(req, res, next) {
        const { countryCode } = req.params;
        if (!countryCode) {
            return next(new models_1.CountryError('No country code specified', 400));
        }
        try {
            const url = `${Country_Service.COUNTRY_INFO_URL}/${encodeURIComponent(countryCode)}`;
            const { data: country } = await axios_1.default.get(url);
            if (!country) {
                throw new models_1.CountryError('Country not found', 404);
            }
            const [population, currency, flag, capital] = await Promise.all([
                Country_Service.getCapital(country),
                Country_Service.getCurrency(country),
                Country_Service.getFlag(country),
                Country_Service.getPopulation(country)
            ]);
            const updatedCountry = {
                ...country,
                ...population,
                ...currency,
                ...flag,
                ...capital
            };
            const response = Country_Service.createResponse(false, 'Country info fetched', updatedCountry);
            return res.json(response);
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * Retrieves the currency of a country.
     * @param {CountryInfo} country - Country information.
     * @returns {Promise<CountryInfo>} - Country information with currency.
     */
    static async getCurrency(country) {
        const { data: currency } = await axios_1.default.post(Country_Service.CURRENCY_URL, { country: country.commonName });
        if (currency.error) {
            throw new models_1.CountryError('Could not get currency', 404);
        }
        return {
            ...country,
            currency: currency.data
        };
    }
    /**
     * Retrieves the ISO codes of a country.
     * @param {CountryInfo} country - Country information.
     * @returns {Promise<CountryInfo>} - Country information with ISO codes.
     */
    static async getIsoCode(country) {
        const { data: isoCode } = await axios_1.default.post(Country_Service.ISO_URL, { country: country.commonName });
        if (isoCode.error) {
            throw new models_1.CountryError('Could not get iso code', 404);
        }
        return {
            ...country,
            codes: isoCode.data
        };
    }
    /**
     * Retrieves the flag of a country.
     * @param {CountryInfo} country - Country information.
     * @returns {Promise<CountryInfo>} - Country information with flag.
     */
    static async getFlag(country) {
        const { codes } = await Country_Service.getIsoCode(country);
        const { data: flag } = await axios_1.default.post(Country_Service.FLAG_URL, { iso2: codes.Iso2 });
        if (flag.error) {
            throw new models_1.CountryError('Could not get flag', 404);
        }
        return {
            ...country,
            flag: flag.data
        };
    }
    /**
     * Retrieves the capital of a country.
     * @param {CountryInfo} country - Country information.
     * @returns {Promise<CountryInfo>} - Country information with capital.
     */
    static async getCapital(country) {
        const { data: capital } = await axios_1.default.post(Country_Service.CAPITAL_URL, { country: country.commonName });
        if (capital.error) {
            throw new models_1.CountryError('Could not get capital', 404);
        }
        return {
            ...country,
            capital: capital.data
        };
    }
    /**
     * Retrieves the population of a country.
     * @param {CountryInfo} country - Country information.
     * @returns {Promise<CountryInfo>} - Country information with population.
     */
    static async getPopulation(country) {
        const { data: population } = await axios_1.default.post(Country_Service.POPULATION_URL, { country: country.commonName });
        if (population.error) {
            throw new models_1.CountryError(`${population.msg}`, 404);
        }
        const countryPopulation = {
            data: {
                country: population.data.country,
                code: population.data.code,
                populationCounts: population.data.populationCounts.map((pc) => {
                    return {
                        year: pc.year,
                        value: pc.value
                    };
                })
            }
        };
        return {
            ...country,
            population: countryPopulation,
        };
    }
    /**
     * Retrieves the states of a specified country
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<Response | void>} - States of the specified country
     */
    static async getStates(req, res, next) {
        //get the country
        const { country } = req.body;
        if (!country) {
            return next(new models_1.CountryError('No country specified', 400));
        }
        try {
            const { data: states } = await axios_1.default.post(Country_Service.STATES_URL, { country: country });
            if (states.error || states.data?.states?.length == 0) {
                throw new models_1.CountryError('Could not find states', 404);
            }
            return res.json(states);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.Country_Service = Country_Service;
/** URL for retrieving available countries. */
Country_Service.AVAILABLE_COUNTRIES_URL = 'https://date.nager.at/api/v3/AvailableCountries';
/** URL for retrieving country information. */
Country_Service.COUNTRY_INFO_URL = 'https://date.nager.at/api/v3/CountryInfo';
/** URL for retrieving population data. */
Country_Service.POPULATION_URL = 'https://countriesnow.space/api/v0.1/countries/population';
/** URL for retrieving states data. */
Country_Service.STATES_URL = 'https://countriesnow.space/api/v0.1/countries/states';
/** URL for retrieving currency data. */
Country_Service.CURRENCY_URL = 'https://countriesnow.space/api/v0.1/countries/currency';
/** URL for retrieving capital data. */
Country_Service.CAPITAL_URL = 'https://countriesnow.space/api/v0.1/countries/capital';
/** URL for retrieving flag data. */
Country_Service.FLAG_URL = 'https://countriesnow.space/api/v0.1/countries/flag/images';
/** URL for retrieving ISO code data. */
Country_Service.ISO_URL = 'https://countriesnow.space/api/v0.1/countries/iso';
