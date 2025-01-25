import React, { createContext, useState } from "react";
import { Country, CountryInfo, StateData } from "../../../backend/src/interfaces/models";
import Country_Service from "../api/country.service";

type ContextProviderProps = {
    children: React.ReactNode;
};

// Base URL
const baseUrl = "https://country-info-app-ts.onrender.com/api";

// Define the AppContext type
export interface AppContextType {
    baseUrl: string; // API base URL
    error: string; // Current error message
    setError: React.Dispatch<React.SetStateAction<string>>; // Function to update the error state
    countries: Country[]; // List of countries
    setCountries: React.Dispatch<React.SetStateAction<Country[]>>; // Function to update the list of countries
    fetchCountries: () => Promise<void>
    country?: CountryInfo,
    setCountry: React.Dispatch<React.SetStateAction<CountryInfo | undefined>>
    fetchCountry: (countryCode: string) => Promise<void>;
    states?: StateData,
    setStates: React.Dispatch<React.SetStateAction<StateData | undefined>>
    fetchStates: (countryName : string) => Promise<void>
    filteredCountries: Country[]
    setFilteredCountries: React.Dispatch<React.SetStateAction<Country[]>>
}

// Create the context with `undefined` as the default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Context provider component
export const ContextProvider = ({ children }: ContextProviderProps) => {
    // State to manage errors and countries
    const [error, setError] = useState<string | "">("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [country, setCountry] = useState<CountryInfo | undefined>(undefined)
    const [states, setStates] = useState<StateData | undefined>(undefined)
    const [filteredCountries, setFilteredCountries] = useState<typeof countries>(countries)

    // Fetch countries from the API
    const fetchCountries = async () : Promise<void> => {
            const { error: apiError, msg, data: fetchedCountries } = await Country_Service.getCountries();
            if (apiError) {
                setError(msg);
                return;
            }
            setCountries(fetchedCountries);
            setFilteredCountries(fetchedCountries)
    };

    const fetchCountry = async (countryCode: string) : Promise<void> => {
            const { error: apiError, msg, data: fetchedCountry } = await Country_Service.getCountryInfo(countryCode);
            
            if (apiError) {
                setError(msg);
                return;
            }         
            setCountry(fetchedCountry);
    }

    const fetchStates = async (countryName : string) : Promise<void> => {
        const { data: fetchedStates } = await Country_Service.getStates(countryName)
        if(fetchedStates) setStates(fetchedStates)
    }

    // Context value
    const contextValue: AppContextType = {
        baseUrl: baseUrl,
        error: error,
        setError: setError,
        countries: countries,
        setCountries: setCountries,
        fetchCountries: fetchCountries,
        country: country,
        setCountry: setCountry,
        fetchCountry: fetchCountry,
        setStates: setStates,
        states: states,
        fetchStates: fetchStates,
        filteredCountries: filteredCountries,
        setFilteredCountries: setFilteredCountries
    };


    // Return the context provider wrapping its children
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
