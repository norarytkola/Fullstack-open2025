
const Numbers = ({p, removePerson}) => {


    return (
        <><p key={p.id}>{p.name} {p.number} <button onClick={removePerson}>remove</button></p> </>
    )
} 

export default Numbers