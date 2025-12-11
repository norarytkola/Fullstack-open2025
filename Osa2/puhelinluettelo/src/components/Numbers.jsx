import nameFilter from './Filter'

const Numbers = ({persons, nameFilter}) => {

    const namesToShow = nameFilter == ''
        ? persons
        : persons.filter(p => p.name.includes(nameFilter))

    return (
        <>{namesToShow.map(p => <p key={p.name}>{p.name} {p.number}</p>)}</>
    )
} 

export default Numbers