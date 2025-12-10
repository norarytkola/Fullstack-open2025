import { useState } from 'react'
import './App.css'

const Header =()=> {
    return(
        <div>
            <h1>Give Feedback</h1>
        </div>
    )
}

const StatisticLine  =(props)=> {
    return(
    <>
    <tr>
        <td>{props.text}</td><td>{props.value}</td>
    </tr>  
    </>
    )
}

const Statistics = (props) => {
    if (props.total > 0) {
        return(
            <>
                <h1>Statistics</h1>
                <table>
                    <StatisticLine text="good"  value ={props.good} />
                    <StatisticLine text="neutral" value ={props.neutral} />
                    <StatisticLine text="bad" value ={props.bad} />
                    <StatisticLine onko={props.total} text="Bad:" value ={props.bad} />
                    <StatisticLine onko={props.total} text="Total:" value ={props.total} />
                    <StatisticLine onko={props.total} text="Average:" value ={((props.good*1)+(props.bad*-1))/props.total} />
                    <StatisticLine onko={props.total} text="Positive:" value ={props.good/props.total*100} />
                </table>
            </>
        )}
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
           )}
}

const App = () => {
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
        <Statistics total = {total} good = {good} neutral = {neutral} bad  = {bad}/>
    </div>
        )
}

export default App
