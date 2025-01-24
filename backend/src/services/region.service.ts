import dotenv from 'dotenv'
dotenv.config()
import axios from "axios";
import { Cities, CityInfo, Country, CountryInfo, Population, PopulationResponse } from "../interfaces/models";
import express, { Request, Response, NextFunction } from 'express';
import { Country_Service } from './country.service';
import { CountryError } from '../interfaces/models';

export class Region_Service {

    private static readonly CITIES_URL : string = 'https://countriesnow.space/api/v0.1/countries/state/cities';
    private static readonly CITIES_POPULATION_URL : string = 'https://countriesnow.space/api/v0.1/countries/population/cities'

    public static async getCities(req: Request, res: Response, next : NextFunction) : Promise<Response | void> {

        const { country, state } = req.body;
        
        if(!country && !state){
            return next(new CountryError('Specify a country and a state', 400))
        }

        try {
            const { data : cities } = await axios.post<Cities>(Region_Service.CITIES_URL, {
                country: country,
                state: state
            })


            if(cities.error){
                throw new CountryError('Cities not found', 404)
            }

            

            return res.json(cities)
        } catch (err: any){
            next(err)
        }
    }
    public static async getCityInfo(req : Request, res : Response, next : NextFunction): Promise<Response | void> {
        const { city : cityName } = req.body;

        if(!cityName){
            return next(new CountryError('Specify a city name', 400))
        }
        
        try {
            const { data : city } = await axios.post<CityInfo>(Region_Service.CITIES_POPULATION_URL, { city: cityName }) 

            if(city.error){
                throw new CountryError('Could not get city', 404)
            }

            return res.json(city.data)
        } catch (err: any){
            next(err)            
        }
    }
}