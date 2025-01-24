export interface Country {
    countryCode: string
    name: string
}
export interface CountryInfo {
    commonName: string
    officialName: string
    countryCode: string
    region: string
    borders?: CountryInfo[]
    population?: Population
    currency: CurrencyData
    capital?: CapitalData
    codes: IsoData
    flag: FlagData
}
//Generic interface
export interface ApiResponse<T> {
    error: boolean,
    msg: string,
    data : T
}

export type PopulationResponse = ApiResponse<PopulationData>
export type CountryInfoResponse = ApiResponse<CountryInfo | undefined>
export type CountryResponse = ApiResponse<Country[]>
export type StateResponse = ApiResponse<StateData | undefined>
export type Cities = ApiResponse<string[]>
export type CityInfo = ApiResponse<CityData>
export type Currency = ApiResponse<CurrencyData>
export type Capital = ApiResponse<CapitalData>
export type IsoCode = ApiResponse<IsoData>
export type Flag = ApiResponse<FlagData>

// Datos de una ciudad según la respuesta de la API

// Detalle de la población según la respuesta de la API

// Representa cómo manejarás los datos internamente en tu app
export interface Population {
    data: PopulationData
}
// Datos procesados de una ciudad
export interface PopulationData {
    code: string
    country: string
    populationCounts: PopulationCounts[]
}
// Detalle procesado de la población
export interface PopulationCounts {
    year: string
    value: string
}
export interface State {
    name: string
    state_code: string
}
export interface StateData {
    name: string
    iso3: string
    states?: State[]
}
export interface CityData {
    city: string
    country: string
    populationCounts: CityPopulation[]
}
export interface CityPopulation {
    year: string
    value: string
}
export interface CurrencyData {
    name: string
    currency: string
}
export interface CapitalData {
    name: string,
    capital: string
}
export interface IsoData {
    name: string,
    Iso2: string,
    Iso3: string
}
export interface FlagData {
    name: string,
    flag: string,
    iso2: string,
    iso3: string
}


export class CountryError extends Error {
    private statusCode : number
    constructor(message: string = 'Internal server error', statusCode : number = 500){
        super(message)
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
    public getStatusCode(){
        return this.statusCode
    }
}
