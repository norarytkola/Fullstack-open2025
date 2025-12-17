import { useState } from 'react'


const Filter =({nameFilter, setNameFilter})=> {

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNameFilter(event.target.value)
    }


    return(
        <div>
            Filter shown with <input value = {nameFilter} onChange = {handleFilterChange}/>
        </div>
    )

}
export default Filter