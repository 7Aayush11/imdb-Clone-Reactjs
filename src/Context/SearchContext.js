import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

const searchContext = createContext();

const SearchState = (props) => {

    const apikey = "40713c4b"
    let [ele, setEle] = useState("")
    const navigate = useNavigate();
    //eslint-disable-next-line
    let [title,setTitle] = useState("")
    const [item, setItem] = useState([])
    const [genre, setGenre] = useState([])
    const [type, setType] = useState("");

    const getItem = async (title) => {
        // setLoading(true)
        const url = `https://www.omdbapi.com/?t=${title}&apikey=${apikey}&plot=full`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setGenre(parsedData.Genre.split(", "))
        setItem(parsedData)
        setType(parsedData.Type.charAt(0).toUpperCase() + parsedData.Type.slice(1))
        // setLoading(false)
    }

    const handleTitle = (title) =>{
        setTitle(title);
        getItem(title)
        navigate(`/${title}/see-more`);
    }

    const handleSearch = (title) => {
        setEle(title);
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