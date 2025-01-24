import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

type StateListProps = {
    countryName: string
}

export const StateList = ({ countryName } : StateListProps) => {
    const { fetchStates, states } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getStates = async () => {
        setIsLoading(true)
        await fetchStates(countryName)
        setIsLoading(false)
    }

    useEffect(()=> {
        getStates()
    }, [])

  

    return <>
        {states?.states ? <div className="min-h-screen flex flex-col items-center justify-center py-8 w-[90%]">
            <h1 className="text-3xl font-extrabold text-gray-800 m-5 text-center">States from {countryName}:</h1>
           
            {isLoading ? (
                <div className="text-indigo-500 font-semibold text-lg">Loading countries...</div>
            ) : states?.states.length !== 0 && (
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
                    {states?.states.map((state) => (
                        <li key={state.state_code} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-indigo-400">
                            {state.name} - {state.state_code}
                        </li>
                    ))}
                </ul>
            )} 
        </div> :  <div><h1 className="text-4xl text-indigo-500 text-4xl font-bold m-4 ">No states available</h1></div>}
    </>
}