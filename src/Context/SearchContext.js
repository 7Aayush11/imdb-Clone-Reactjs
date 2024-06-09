import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

const searchContext = createContext();

const SearchState = (props) => {

    let [ele, setEle] = useState("")
    const navigate = useNavigate();

    const handleSearch = (title) => {
        setEle(title);
        navigate(`/search/${title}`);
    }

    return (
        <searchContext.Provider value={{ handleSearch, ele }}>
            {props.children}
        </searchContext.Provider>
    )
}
// eslint-disable-next-line
export default {searchContext, SearchState};