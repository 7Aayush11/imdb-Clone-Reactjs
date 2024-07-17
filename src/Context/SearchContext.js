import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

const searchContext = createContext();

const SearchState = (props) => {

    const apikey = "40713c4b"
    let [ele, setEle] = useState([])
    const navigate = useNavigate();
    //eslint-disable-next-line
    let [ID, setID] = useState("")
    const [item, setItem] = useState([])
    const [genre, setGenre] = useState([])
    const [type, setType] = useState("");
    const [user, setUser] = useState(null)
    const host = "http://localhost:4000"
    const itemsInitial = []
    const [saveitems, setSaveItems] = useState(itemsInitial)

    // Get user Data
    const getUser = async () => {
        // API Call 
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MmI0OWVjMTgzZTc4NTA4MDI1ODFiIn0sImlhdCI6MTcyMDg5MDUyNn0.lOkWXLr85SBmOIW5f3PwfzmowvqJuw4D7DBCICuB4g0'
            }
        });
        const json = await response.json()
    }

    // Get all Notes
    const getSaveItems = async () => {
        // API Call 
        const response = await fetch(`${host}/api/watchlater/fetchsaved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MmI0OWVjMTgzZTc4NTA4MDI1ODFiIn0sImlhdCI6MTcyMDg5MDUyNn0.lOkWXLr85SBmOIW5f3PwfzmowvqJuw4D7DBCICuB4g0'
            }
        });
        const json = await response.json()
        setSaveItems(json)
    }

    // Add a Item
    const addItem = async (imdbId, poster) => {
        // API Call 
        const response = await fetch(`${host}/api/watchlater/additem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MmI0OWVjMTgzZTc4NTA4MDI1ODFiIn0sImlhdCI6MTcyMDg5MDUyNn0.lOkWXLr85SBmOIW5f3PwfzmowvqJuw4D7DBCICuB4g0'
            },
            body: JSON.stringify({ imdbId, poster })
        });

        const item = await response.json();
        setSaveItems(saveitems.concat(item))
    }
    // Remove an item
    const removeItem = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/watchlater/removeitem/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MmI0OWVjMTgzZTc4NTA4MDI1ODFiIn0sImlhdCI6MTcyMDg5MDUyNn0.lOkWXLr85SBmOIW5f3PwfzmowvqJuw4D7DBCICuB4g0'
            }
        });
        setSaveItems(saveitems.filter((item) => item._id !== id))
    }


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

    const handleTitle = (imdbID) => {
        setID(imdbID);
        getItem(imdbID);
    }

    const handleSearch = ([title, type]) => {
        setEle([title, type]);
        navigate(`/search/${title}`);
    }

    return (
        <searchContext.Provider value={{ handleSearch, ele, handleTitle, item, genre, type, addItem, getSaveItems, saveitems, getUser, removeItem}}>
            {props.children}
        </searchContext.Provider>
    )
}
// eslint-disable-next-line
export default { searchContext, SearchState };