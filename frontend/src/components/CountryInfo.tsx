import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import { LineChart, XAxis, Line, CartesianGrid, Tooltip, YAxis, Legend } from "recharts";
import { StateList } from "./StateList";
import { Button } from "./Button";

export const CountryInfo = () => {
    const { countryCode } = useParams<{ countryCode: string }>();
    const { country, fetchCountry, error, setError } = useAppContext();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setError("")
        const getCountryInfo = async () => {
            if (countryCode) {
                setLoading(true);
                await fetchCountry(countryCode);
                setLoading(false);
            }
        };
        getCountryInfo();
    }, [countryCode]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-indigo-600 text-xl font-semibold">Loading country information...</p>
            </div>
        );
    }
    
    if (error !== "") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <p className="text-red-600 text-xl font-semibold">Error: {error}</p>
                <div>
                <Button message="Back to countries" link="/"/>
                </div>
            </div>
        );
    }

    if (!country) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600 text-xl font-semibold">No country information available.</p>
            </div>
        );
    }

    const populationData = country.population?.data.populationCounts.map((item) => ({
        year: item.year,
        value: item.value
    })) || [];

    // Add a fallback for empty population data or invalid data format
    if (populationData?.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600 text-xl font-semibold">Population data is unavailable.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
            <Button message="Back to countries" link="/"/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl py-8">
                <div className="flex items-center gap-6 mb-6">
                    <img
                        src={country.flag.flag}
                        alt={`${country.commonName} flag`}
                        className="w-32 h-auto rounded-md"
                    />
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">{country.commonName}</h1>
                        <code className="text-sm text-gray-600">{country.countryCode}</code>
                    </div>
                </div>

                <ul className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-wrap items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold text-gray-700 w-full">Borders:</h2>
                    {country.borders && country.borders.length > 0 ? (
                        country.borders.map((border) => (
                            <Link
                                to={`/country-info/${border.countryCode}`}
                                key={border.commonName}
                                className="p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-indigo-400"
                            >
                                {border.commonName}
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 w-full">No bordering countries available.</p>
                    )}
                </ul>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-700">Capital:</h2>
                        <p className="text-gray-700">{country.capital?.capital}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-700">Currency:</h2>
                        <p className="text-gray-700">{country.currency?.currency}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-700">Region:</h2>
                        <p className="text-gray-700">{country.region}</p>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 my-4 ">Population Over Time:</h2>
                <div className="m-6 flex flex-col items-start justify-center overflow-scroll">
                    
                    {populationData ? <LineChart
                        width={600}
                        height={400}
                        data={populationData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            name="Population"
                        />
                    </LineChart> : 'Population not available'}
                </div>
            </div>
            <StateList countryName={country.commonName}/>
        </div>
    );
};
