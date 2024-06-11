import React, { useContext, useState, useEffect } from 'react'
import SearchContext from '../Context/SearchContext';
import SearchItem from './SearchItem';
import Spinner from './Spinner';
import NA from "./NA.png"


const Searched = () => {

  const { searchContext } = SearchContext
  const { ele } = useContext(searchContext)

  // const [response, setResponse] = useState("False")
  const [page, setPage] = useState(1)
  const [item, setItem] = useState([]);
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)

  const apikey = "40713c4b"

  const updateContent = async () => {
    setPage(1)
    setLoading(true)
    const url = `https://www.omdbapi.com/?s=${ele}&page=1&apikey=${apikey}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setItem(parsedData)
    setTotalResults(parsedData.totalResults)
    // setResponse(parsedData.Response)
    setLoading(false)

  }

  useEffect(() => {
    updateContent();
    // eslint-disable-next-line
  }, [ele]);

  const fetchNextData = async () => {
    setLoading(true)
    window.scrollTo(10, 10);
    setPage(page + 1)
    const url = `https://www.omdbapi.com/?s=${ele}&page=${page + 1}&apikey=${apikey}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setItem(parsedData)
    setLoading(false)
  };

  const fetchPrevData = async () => {
    setLoading(true)
    window.scrollTo(0, 0);
    setPage(page - 1)
    const url = `https://www.omdbapi.com/?s=${ele}&page=${page - 1}&apikey=${apikey}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setItem(parsedData)
    setLoading(false)
  };

  if (item.Response === "True") {
    return (
      <div>
        <h1 className='text-center' style={{ marginTop: '55px', color: "#dfd8d8" }}>Results for {ele}</h1>
        {loading && <Spinner />}
        <div className="container text-align-center" style={{ marginTop: "35px" }}>
          {item.Search.map((element) => {
            return <div className='col' key={element.imdbID}>
              <SearchItem poster={element.Poster === "N/A" ? NA : element.Poster} type={element.Type} year={element.Year} title={element.Title}
              />
            </div>
          })}
          <div className="flex-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ fontFamily: 'monospace' }} type="button" className="btn btn-danger" onClick={fetchPrevData} disabled={page <= 1}>  Previous</button>
            <button style={{ fontFamily: 'monospace' }} type="button" className="btn btn-danger" onClick={fetchNextData} disabled={page + 1 > Math.ceil(totalResults / 10)}>Next</button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1 className='text-center' style={{ marginTop: '55px', color: "#dfd8d8" }}>No Results for {ele}</h1>
        <p className='text-center' style={{ color: "#dfd8d8" }}>{item.Error}</p>
      </div>
    )
  }

}

export default Searched
