import '../index.css'

const Notification = ({ message, errorMessage}) => {
  if (message === null && errorMessage === null) {
    return null
  }

  return (
    <>
        <div className="success">
            {message}
        </div>
        <div className="error">
        {errorMessage}
        </div>
    </>

  )
}

export default Notification