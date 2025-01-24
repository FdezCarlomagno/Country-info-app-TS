import { useState } from "react"

type SearchBarProps = {
    onSearch: (search : string) => void
}

export const SearchBar = ({ onSearch } : SearchBarProps ) => {
    const [search, setSearch] = useState<string | ''>('')

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        onSearch(e.target.value)
    }

    return (
        <div className="flex w-[70%] justify-center">
            <input type="search"
                   onChange={handleSearch}
                   value={search}
                   placeholder="Search country" 
                   className="w-full p-3 m-3 border border-gray-200 rounded-md shadow-md"
            />
        </div>
    )
}
