
import Country from './Country'


const Countries = ({countries, filter}) => {

    const countriesToShow = countries.filter(c =>
        c.name.common.toLowerCase().includes(filter.toLowerCase()))
        
        if (countriesToShow.length> 0 && countriesToShow.length<11){

            return (
            <>
                {countriesToShow.map(c => <Country c = {c} length = {countriesToShow.length}/> )}
            </>
            )
        }else if (filter.length===0){
            return (null)
        } else if (countriesToShow.length >10){
        return (<div>Too many matches, specify another filter.</div>)
        }
        
    }

export default Countries