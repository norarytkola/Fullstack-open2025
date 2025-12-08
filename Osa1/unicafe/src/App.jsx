import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Header =()=> {
    return(
        <div>
            <h1>Give Feedback</h1>
        </div>
    )
}

const StatisticLine  =(props)=> {
    if (props.onko > 0 ){
    return(
        <> 
        <tr>
           <td>{props.text}</td><td>{props.value}</td>
        </tr>
        </>
    )
    } else { return null}
}
const Button =(props)=> {
    return (
        <>
            <button onClick={props.handleclick}>{props.nimi}</button>
        </>
    )
}
const OnkoPalautteita =(props)=> {

        if  ( props.onko === 0) {
            return (
            <div>
                <h1>Statistics</h1>
                  No feedback given
             </div>
           )} else { return <h1>Statistics</h1>}
           
}

const App = (props) => {
    const [good, setGood] = useState(0)
    const  [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    let total = good + neutral + bad

        return (
    <div>
        <Header/>
        <Button handleclick={() => setGood(good +1)} nimi="good"></Button>
        <Button handleclick={() =>setNeutral(neutral +1)} nimi="neutral"></Button>
        <Button handleclick={() =>setBad(bad +1)} nimi="bad"></Button>
        <OnkoPalautteita onko={total} />
        <StatisticLine  onko={total} text="Good:" value ={good} />
        <StatisticLine  onko={total} text="Neutral:" value ={neutral} />
        <StatisticLine  onko={total} text="Bad:" value ={bad} />
        <StatisticLine  onko={total} text="All:" value ={total} />
        <StatisticLine  onko={total} text="Average:" value ={((good * 1)+(bad * -1))/ total } />
        <StatisticLine  onko={total} text="Positive:" value ={good / total*100} />
       
    
    </div>
        )


}

export default App
