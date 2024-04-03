import { useState, ChangeEventHandler } from "react";

export const useSearch = () => {
    const [search, setSearch] = useState("");
    const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        setSearch(value);
    };
    return {
        search,handleSearch
    }
}