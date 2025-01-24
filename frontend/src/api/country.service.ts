import axios from "axios";
import { CountryInfoResponse, CountryResponse, StateResponse } from "../../../backend/src/interfaces/models";

class Country_Service {
    private baseURL: string;

    constructor(baseURL: string = "http://localhost:3000/api") {
        this.baseURL = baseURL;
    }

    public async getCountries(): Promise<CountryResponse> {
        try {
            const { data: countries } = await axios.get<CountryResponse>(`${this.baseURL}/countries`);

            
            // Verificación de estructura básica del objeto recibido
            if (countries.error) {
                return {
                    error: countries.error,
                    msg: countries.msg,
                    data: [],
                };
            }

            return countries; // Ya tiene la estructura de CountryResponse
        } catch (err: any) {
            console.error("Error fetching countries:", err.message);

            // Devolver un objeto con error y datos vacíos
            return {
                error: true,
                msg: "Could not fetch countries",
                data: [],
            };
        }
    }
    public async getCountryInfo(countryCode: string): Promise<CountryInfoResponse> {
        
        if (!countryCode) {
            return { error: true, msg: 'Specify country code', data: undefined }
        }

        try {
            const { data: country } = await axios.get<CountryInfoResponse>(`${this.baseURL}/country-info/${countryCode}`)
           
            if (country.error) {
                return {
                    error: country.error,
                    msg: country.msg,
                    data: undefined,
                };
            }
            
            return country;
        } catch (err: any) {
            console.error("Error fetching country info:", err.message);

            // Devolver un objeto con error y datos vacíos
            return {
                error: true,
                msg: "Could not fetch country info",
                data: undefined,
            };
        }
    }
    public async getStates(countryName : string) : Promise<StateResponse> {
        try {
           
            const { data: states } = await axios.post<StateResponse>(`${this.baseURL}/states`, { country: countryName })

            if(states.error){
                return {
                    error: states.error,
                    msg: states.msg,
                    data: undefined,
                };
            }
            return states;
        } catch (err: any) {
            console.error("Error fetching states:", err.message);

            // Devolver un objeto con error y datos vacíos
            return {
                error: true,
                msg: "Could not fetch states",
                data: undefined,
            };
        }

    }  
}

export default new Country_Service
