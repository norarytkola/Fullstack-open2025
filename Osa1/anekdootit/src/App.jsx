import { useState } from 'react'

const AnecdoteOfTheDay = (props) => {
    return ( 
        <>
        {props.anecdotes[props.selected]}
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
    <>Most votes: {anecdotes[i]}
    Äänet: {suurin}
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
  let random=(Math.round(5 * Math.random()))
  const [votes, vote] = useState(Array(listLength).fill(0))
  const copy=[...votes]
  const voting =(selected)=> {
      copy[selected]+=1
      vote(copy)
  }

  return (
      <div>
        <h1>Anecdote of the day </h1>
        <AnecdoteOfTheDay anecdotes={anecdotes} selected={selected}/>
        <div>
          <button onClick={() => setSelected(random)}>Next anecdote</button>
          <button onClick={()=> voting(selected) }>Vote</button>
        </div>
        
        <h1>Anecdotes with most votes </h1>
        Votes:{votes[selected]}<br/>
        <div>{MostVotes (votes, anecdotes) }</div>
      </div>
  )
}

export default App