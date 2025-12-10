import { useState } from 'react'

const AnecdoteOfTheDay = (props) => {
    return ( 
        <>
        <p>{props.anecdotes[props.selected]}</p>
        <p>Has {props.votes[props.selected]} votes</p>
        </>
    )
}

const MostVotes =(aanet, anecdotes) => {
  let suurin=0
    for (let i=0; i < aanet.length; i++){
      if (aanet[i]>suurin){
        suurin=aanet[i]
      }
    }

  if (suurin===0) {return (
    <>No votes yet.</>
  )} 
  else {
  
  let i=aanet.indexOf(suurin)
  return (
    <>
    <p>{anecdotes[i]}</p>
    <p>Has {suurin} votes</p>
    </>
  )}
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const listLength = anecdotes.length
  const [selected, setSelected] = useState(0)
  const rand = (() => {
    let r;
    do {
      r = Math.floor(Math.random() * anecdotes.length);
      } 
    while (r === selected);
    return r;
    })();
  const [votes, vote] = useState(Array(listLength).fill(0))
  const voting =(selected)=> {
    const copy = [...votes]
      copy[selected]+=1
      vote(copy)
  }

  return (
      <div>
        <h1>Anecdote of the day </h1>
        <AnecdoteOfTheDay anecdotes={anecdotes} selected={selected} votes = {votes}/>
        <div>
          <button onClick={() => setSelected(rand)}>Next anecdote</button>
          <button onClick={()=> voting(selected) }>Vote</button>
        </div>
        
        <h1>Anecdotes with most votes </h1>
        <div>{MostVotes (votes, anecdotes) }</div>
      </div>
  )
}

export default App