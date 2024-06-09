import React from 'react'

const SearchItem = (props) => {
   
  return (
    <div>
      <div id="SIcard" className="card mb-3">
        <div className="row g-0">
          <div className="col-md-2">
            <img src={props.poster} className="img-fluid rounded-start" alt="" style={{height: "200px"}}/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">Type: {props.type} <br/>Rating: TO BE ADDED</p>
              <p className="card-text"><small className="card-text">Year: {props.year}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
