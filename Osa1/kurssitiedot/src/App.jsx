const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Part =(props)=> {
    console.log(props);
    return (
        <div>
           Nimi:{props.nimi} <br/> Kurssimäärä:{props.int}
        </div>

    )
}

const Content =(props)=> {
    return (
        <div>
          <p>
            <Part nimi={props.nimi1} int={props.int1}/>
          </p>
          <p>  
            <Part nimi={props.nimi2} int={props.int2}/>
          </p>
          <p>
            <Part nimi={props.nimi3} int={props.int3}/>
          </p>
        </div>
    )
}

const Total =(props)=> {
    return (
    <div>
         Yhteensä {props.yht} tehtävää.
    </div>
    )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content nimi1={part1} nimi2={part2} nimi3={part3} int1={exercises1} int2={exercises2} int3={exercises3} />
      <Total yht= {exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App