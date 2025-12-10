const Header = (props) => {
  return (
    <h1> {props.course.name} </h1>
  )
}

const Part =(props)=> {
    console.log(props);
    return (
        <p>
           {props.nimi} {props.int}
        </p>

    )
}

const Content =(props)=> {
    return (
        <>     
            {props.parts.map(part => <Part key={part.id} nimi={part.name} int={part.exercises} />)}
        </>
    )
}

const Total =(props)=> {
    return (
    <div>
         <b>Total of {props.total} exercises.</b>
    </div>
    )
}

const Course =(props)=> {
  return(
    <>
    <Header course={props.course} />
    <Content parts = {props.course.parts} />
    <Total total = {props.total} /></>
    
  )
    

}

const App = () => {
  const courses =[{
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }]

  return (
    <div>
       {courses.map(course => <Course key = {course.id} course = {course} total = {course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>)}
    </div>
  )
}

export default App