import React, { useContext } from 'react'
import SearchContext from '../Context/SearchContext'

const SearchItem = (props) => {
  
  const {searchContext} = SearchContext
  const {handleTitle} = useContext(searchContext)

  return (
    <div>
      <div id="SIcard" className="card mb-3">
        <div className="row g-0">
          <div className="col-md-2">
            <img src={props.poster} className="img-fluid rounded-start" alt="Poster Not Available" style={{height: "200px"}}/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">Type: {props.type}</p>
              <p className="card-text"><small className="card-text">Year: {props.year}</small></p>
              <button type="button" disabled={props.type==="game"} className="btn btn-outline-primary" onClick={()=>handleTitle(props.title)}>See More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
