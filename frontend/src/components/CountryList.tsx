import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
function CountryList() {
  const { countries, fetchCountries, filteredCountries, setFilteredCountries } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (search : string) : void => {
    setFilteredCountries(countries.filter((country) => 
      country.name.toLowerCase().includes(search.toLowerCase()) || 
      country.countryCode.toLowerCase().includes(search.toLowerCase())
    ))
  }

  // Obtiene los países desde el contexto
  const getCountries = async () => {
    setLoading(true); // Activa el estado de carga
    await fetchCountries();
    setLoading(false); // Desactiva el estado de carga
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md m-4 w-3/4 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🌎 Country Info App
        </h1>
        <p className="text-gray-600 mt-2">
          Explore detailed information about countries around the world.
        </p>
      </div>
      <SearchBar onSearch={handleSearch}/>
      <div className="flex flex-col items-center justify-center w-full px-4">
        {loading ? (
          <div className="text-indigo-500 font-semibold text-lg">Loading countries...</div>
        ) : countries && countries.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            {filteredCountries.map((country) => (
              <li key={country.countryCode}>
                <Link
                  to={`/country-info/${country.countryCode}`}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-indigo-400"
                >
                  <h2 className="text-lg font-bold text-gray-700">
                    {country.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Code: {country.countryCode}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600 font-medium text-lg">
            No countries found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryList;
