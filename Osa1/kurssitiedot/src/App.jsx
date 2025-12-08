const Header = (props) => {
  return (
    <h1> {props.course.name} </h1>
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
            <Part nimi={props.parts[0].name} int={props.parts[0].exercises}/>
          </p>
          <p>  
            <Part nimi={props.parts[1].name} int={props.parts[1].exercises}/>
          </p>
          <p>
            <Part nimi={props.parts[2].name} int={props.parts[2].exercises}/>
          </p>
        </div>
    )
}

const Total =(props)=> {
    return (
    <div>
         Yhteensä total = {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää.
    </div>
    )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App