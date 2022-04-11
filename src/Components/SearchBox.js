import React from 'react'

const SearchBox = (props) => {
  return (
    <div>
        <div className='d-flex justify-content-end'>
        <input type="text" value={props.value} placeholder='Type to Search' onChange={(event)=>props.setSearchValue(event.target.value)}/>
        </div>
        
    </div>
  )
}

export default SearchBox