import React, { useContext, useState, useEffect } from 'react'
import SearchContext from '../Context/SearchContext';
import SearchItem from './SearchItem';


const Searched = () => {

  const { searchContext } = SearchContext
  const { ele } = useContext(searchContext)

  const [page, setPage] = useState(1)
  const [item, setItem] = useState([]);
  const [totalResults, setTotalResults] = useState(0)

  const apikey = "40713c4b"

  const updateContent = async () => {
    const url = `https://www.omdbapi.com/?s=${ele}&apikey=${apikey}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setItem(parsedData.Search)
    setTotalResults(parsedData.totalResults)
  }

  useEffect(() => {
    updateContent();
    // eslint-disable-next-line
  }, [ele]);

  const fetchNextData = async () => {
    setPage(page + 1)
    updateContent()
    const url = `https://www.omdbapi.com/?s=${ele}&page=${page}&apikey=${apikey}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setItem(item.concat(parsedData.Search))
    setTotalResults(parsedData.totalResults)
    console.log(parsedData);
  };

  const fetchPrevData = async () => {
    setPage(page - 1)
    updateContent()
    const url = `https://www.omdbapi.com/?s=${ele}&page=${page}&apikey=${apikey}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setItem(item.concat(parsedData.Search))
    setTotalResults(parsedData.totalResults)
    console.log(parsedData);
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "35px" }}>

        {item.map((element) => {
          return <div className='col' key={element.imdbID}>
            <SearchItem poster={element.Poster} type={element.Type} year={element.Year} title={element.Title}/>
          </div>
        })}

        <button type="button"  className="btn btn-danger" onClick={fetchPrevData} disabled={page <= 1}> &larr; Previous</button>
        <button type="button"  className="btn btn-danger" onClick={fetchNextData} disabled={page + 1 > Math.ceil(totalResults / 10)}>Next &rarr;</button>
      </div>
    </div>
  )
}

export default Searched
