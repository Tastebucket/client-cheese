import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllCheeses } from '../../api/cheeses'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
// styling objects use any CSS style, but in camelCase instead of the typical hyphenated naming convention
// this is because we're in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// CheesesIndex will make a request to the API for all cheeses
// once it receives a response, display a card for each cheese
const CheesesIndex = (props) => {
    const [cheeses, setCheeses] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the cheeses in index', cheeses)
    // pull the message alert (msgAlert) from props
    const { msgAlert, user } = props

    // get our cheeses from the api when the component mounts
    useEffect(() => {
        getAllCheeses()
            .then(res => setCheeses(res.data.cheeses))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting cheeses',
                    message: messages.getCheesesFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!cheeses) {
        // if no cheeses loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (cheeses.length === 0) {
        // otherwise if there ARE no cheeses, display that message
        return <p>No cheeses yet, go add some!</p>
    }

    // once we have an array of cheeses, loop over them
    // produce one card for every cheese
    const cheeseCards = cheeses.map(cheese => (
        <Card key={ cheese.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ cheese.type }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/cheeses/${cheese._id}`} className="btn btn-info">View { cheese.type }</Link>
                </Card.Text>
                { cheese.owner ?
                <Card.Footer>
                     owner: {cheese.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the cheesecards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { cheeseCards }
        </div>
    )
}

// export our component
export default CheesesIndex