import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";
import { Country, CountryInfo, Population, PopulationResponse, Currency, CurrencyData, Capital, IsoCode, Flag, ApiResponse, StateResponse } from "../interfaces/models";
import express, { Request, Response, NextFunction } from 'express';
import { CountryError } from '../interfaces/models';

/**
 * Service class for handling country-related data retrieval.
 */
export class Country_Service {
    /** URL for retrieving available countries. */
    private static readonly AVAILABLE_COUNTRIES_URL: string = 'https://date.nager.at/api/v3/AvailableCountries';
    /** URL for retrieving country information. */
    private static readonly COUNTRY_INFO_URL: string = 'https://date.nager.at/api/v3/CountryInfo';
    /** URL for retrieving population data. */
    private static readonly POPULATION_URL: string = 'https://countriesnow.space/api/v0.1/countries/population';
    /** URL for retrieving states data. */
    private static readonly STATES_URL: string = 'https://countriesnow.space/api/v0.1/countries/states';
    /** URL for retrieving currency data. */
    private static readonly CURRENCY_URL: string = 'https://countriesnow.space/api/v0.1/countries/currency';
    /** URL for retrieving capital data. */
    private static readonly CAPITAL_URL: string = 'https://countriesnow.space/api/v0.1/countries/capital';
    /** URL for retrieving flag data. */
    private static readonly FLAG_URL: string = 'https://countriesnow.space/api/v0.1/countries/flag/images';
    /** URL for retrieving ISO code data. */
    private static readonly ISO_URL: string = 'https://countriesnow.space/api/v0.1/countries/iso';

    /**
     * Creates a standardized API response.
     * @template T - Type of the data returned.
     * @param {boolean} error - Indicates if there was an error.
     * @param {string} msg - Message describing the response.
     * @param {T | []} data - Data returned in the response.
     * @returns {ApiResponse<T>} - Standardized API response.
     */

    private static createResponse<T>(error: boolean, msg: string, data: T): ApiResponse<T> {
        return { error, msg, data };
    }

    /**
     * Retrieves a list of all available countries.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<Response | void>} - List of countries or error.
     */

    public static async getCountries(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { data: countries } = await axios.get<Country[]>(Country_Service.AVAILABLE_COUNTRIES_URL);

            if (!Array.isArray(countries) || countries.length === 0) {
                throw new CountryError('Could not fetch countries', 404);
            }

            const response = Country_Service.createResponse(false, 'Countries fetched', countries);
            return res.json(response);
        } catch (err: any) {
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

    public static async getCountryInfo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { countryCode } = req.params;

        if (!countryCode) {
            return next(new CountryError('No country code specified', 400));
        }

        try {
            const url = `${Country_Service.COUNTRY_INFO_URL}/${encodeURIComponent(countryCode)}`;
            const { data: country } = await axios.get<CountryInfo>(url);

            if (!country) {
                throw new CountryError('Country not found', 404);
            }

            const [population, currency, flag, capital] = await Promise.all([
                Country_Service.getCapital(country),
                Country_Service.getCurrency(country),
                Country_Service.getFlag(country),
                Country_Service.getPopulation(country)
            ]);

            const updatedCountry: CountryInfo = {
                ...country,
                ...population,
                ...currency,
                ...flag,
                ...capital
            };

            const response = Country_Service.createResponse(false, 'Country info fetched', updatedCountry);
            return res.json(response);
        } catch (err: any) {
            next(err);
        }
    }

    /**
     * Retrieves the currency of a country.
     * @param {CountryInfo} country - Country information.
     * @returns {Promise<CountryInfo>} - Country information with currency.
     */

    public static async getCurrency(country: CountryInfo): Promise<CountryInfo> {
        const { data: currency } = await axios.post<Currency>(Country_Service.CURRENCY_URL, { country: country.commonName });

        if (currency.error) {
            throw new CountryError('Could not get currency', 404);
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

    public static async getIsoCode(country: CountryInfo): Promise<CountryInfo> {
        const { data: isoCode } = await axios.post<IsoCode>(Country_Service.ISO_URL, { country: country.commonName });

        if (isoCode.error) {
            throw new CountryError('Could not get iso code', 404);
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

    public static async getFlag(country: CountryInfo): Promise<CountryInfo> {
        const { codes } = await Country_Service.getIsoCode(country);

        const { data: flag } = await axios.post<Flag>(Country_Service.FLAG_URL, { iso2: codes.Iso2 });

        if (flag.error) {
            throw new CountryError('Could not get flag', 404);
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

    public static async getCapital(country: CountryInfo): Promise<CountryInfo> {
        const { data: capital } = await axios.post<Capital>(Country_Service.CAPITAL_URL, { country: country.commonName });

        if (capital.error) {
            throw new CountryError('Could not get capital', 404);
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

    public static async getPopulation(country: CountryInfo): Promise<CountryInfo> {
        const { data: population } = await axios.post<PopulationResponse>(
            Country_Service.POPULATION_URL,
            { country: country.commonName }
        );

        if (population.error) {
            throw new CountryError(`${population.msg}`, 404);
        }

        const countryPopulation: Population = {
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

    public static async getStates(req : Request, res: Response, next : NextFunction): Promise<Response | void> {
        //get the country
        const { country } = req.body;
        
        if(!country){
            return next(new CountryError('No country specified', 400))
        }

        try {
            const { data: states } = await axios.post<StateResponse>(Country_Service.STATES_URL, { country : country })

            if(states.error || states.data?.states?.length == 0){
                throw new CountryError('Could not find states', 404)
            }

            return res.json(states)
        } catch (err: any){
            next(err)
        }
    }
}


