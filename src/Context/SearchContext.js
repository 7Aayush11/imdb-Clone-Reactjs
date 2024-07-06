import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

const searchContext = createContext();

const SearchState = (props) => {

    const apikey = "40713c4b"
    let [ele, setEle] = useState([])
    const navigate = useNavigate();
    //eslint-disable-next-line
    let [ID,setID] = useState("")
    const [item, setItem] = useState([])
    const [genre, setGenre] = useState([])
    const [type, setType] = useState("");

    const getItem = async (imdbID) => {
        // setLoading(true)
        const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}&plot=full`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setGenre(parsedData.Genre.split(", "))
        setItem(parsedData)
        setType(parsedData.Type.charAt(0).toUpperCase() + parsedData.Type.slice(1))
        navigate(`/${parsedData.Title}/see-more`);
        // setLoading(false)
    }

    const handleTitle = (imdbID) =>{
        setID(imdbID);
        getItem(imdbID);
    }

    const handleSearch = ([title,type]) => {
        setEle([title, type]);
        navigate(`/search/${title}`);
    }

    return (
        <searchContext.Provider value={{ handleSearch, ele, handleTitle, item, genre, type }}>
            {props.children}
        </searchContext.Provider>
    )
}
// eslint-disable-next-line
export default {searchContext, SearchState};