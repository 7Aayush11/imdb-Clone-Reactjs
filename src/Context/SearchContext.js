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
    const host = "http://localhost:4000"
    const itemsInitial = []
    const [saveitems, setSaveItems] = useState(itemsInitial)
    const [alert, setAlert] = useState(null)
    const[loading, setLoading] = useState(false)

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1600);
    }

    // Get user Data
    const getUser = async () => {
        // API Call
        if (localStorage.getItem('token')) {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            //eslint-disable-next-line
            const json = await response.json()
        }
    }

    // Get all Notes
    const getSaveItems = async () => {
        // API Call
        setLoading(true)
        if (localStorage.getItem('token')) {
            const response = await fetch(`${host}/api/watchlater/fetchsaved`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json()
            setSaveItems(json)
        }
        setLoading(false)
    }

    // Add a Item
    const addItem = async (imdbId, poster) => {
        // API Call
        if (localStorage.getItem('token')) {
            const response = await fetch(`${host}/api/watchlater/additem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ imdbId, poster })
            });
            const item = await response.json();
            setSaveItems(saveitems.concat(item))
        }
    }
    // Remove an item
    const removeItem = async (id) => {
        // API Call
        if (localStorage.getItem('token')) {
            // eslint-disable-next-line
            const response = await fetch(`${host}/api/watchlater/removeitem/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            setSaveItems(saveitems.filter((item) => item._id !== id))
        }
    }

    const getItem = async (imdbID) => {
        setLoading(true)
        const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}&plot=full`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setGenre(parsedData.Genre.split(", "))
        setItem(parsedData)
        setType(parsedData.Type.charAt(0).toUpperCase() + parsedData.Type.slice(1))
        navigate(`/${parsedData.Title}/see-more`);
        setLoading(false)
    }

    const handleTitle = (imdbID) => {
        setID(imdbID);
        getItem(imdbID);
    }


    return (
        <searchContext.Provider value={{ele, setEle, handleTitle, item, genre, type, addItem, getSaveItems, saveitems, getUser, removeItem, showAlert, setAlert, alert, loading }}>
            {props.children}
        </searchContext.Provider>
    )
}
// eslint-disable-next-line
export default { searchContext, SearchState };