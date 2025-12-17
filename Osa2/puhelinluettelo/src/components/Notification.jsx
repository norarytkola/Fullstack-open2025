import '../index.css'

const Notification = ({ message, errorMessage}) => {
  if (message === null && errorMessage === null) {
    return null
  } else if (message !== null){
    return (
      <div className="success">
            {message}
        </div>
    )
  } else if (errorMessage !== null){
     return (
        <div className="error">
        {errorMessage}
        </div>

  )
  }

 
}

export default Notification