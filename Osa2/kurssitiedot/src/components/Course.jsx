const Course =(props)=> {
  return(
    <>
    <Header course={props.course} />
    <Content parts = {props.course.parts} />
    <Total total = {props.total} /></>
    
  )
    

}

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


export default Course