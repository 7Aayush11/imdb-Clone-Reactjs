import React, { useContext, useEffect, useState } from 'react'
import SearchContext from '../Context/SearchContext'

const Saved = () => {

  const { searchContext } = SearchContext
  const { getUser, getSaveItems, saveitems, removeItem } = useContext(searchContext)

  useEffect(() => {
    getUser()
    getSaveItems()
  }, []);

  const handleRemove = (id)=>{
    removeItem(id)
  } 

  console.log(saveitems);
  return (
    <div className="saved row" style={{ color: 'white', textAlign: 'center'}}>
      <h1>Saved</h1>

      <div className='container mx-2' >
        {saveitems.length === 0 && "No items Available"}
      </div>
      {saveitems.map((item) => {
        // saveItem(item.imdbId) Check for fixes it is going into infinite loop
        return (
          <div className="col-md-3" key={item._id} style={{textAlign: 'center'}}>
            <img src={item.poster} alt={item.imdbId} className="saved__item__image" style={{ height: '300px' }} />
            <button type="button" className="btn btn-danger my-2" onClick={()=>handleRemove(item._id)}>Remove</button>
          </div>
        )
      })}

    </div>
  )
}
export default Saved;


