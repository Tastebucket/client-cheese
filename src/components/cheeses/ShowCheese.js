import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneCheese, removeCheese, updateCheese } from '../../api/cheeses'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditCheeseModal from './EditCheeseModal'
import ShowMold from '../molds/ShowMold'
import NewMoldModal from '../molds/NewMoldModal'

// we need to get the cheese's id from the route parameters
// then we need to make a request to the api
// when we retrieve a cheese from the api, we'll render the data on the screen

const moldCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowCheese = (props) => {
    const [cheese, setCheese] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [moldModalShow, setMoldModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowCheese props', user)
    console.log('msgAlert in ShowCheese props', msgAlert)

    useEffect(() => {
        getOneCheese(id)
            .then(res => setCheese(res.data.cheese))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting cheeses',
                    message: messages.getCheesesFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    // here's where our removeCheese function will be called
    const eatCheese = () => {
        removeCheese(user, cheese._id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeCheeseSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeCheeseFailure,
                    variant: 'danger'
                })
            })
    }

    let moldCards
    if (cheese) {
        if (cheese.mold.length > 0) {
            moldCards = cheese.mold.map(mold => (
                <ShowMold
                    key={mold.id} 
                    mold={mold}
                    user={user}
                    cheese={cheese}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!cheese) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ cheese.type }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { cheese.age }</small></div>
                            <div>
                                <small>
                                    { cheese.isStinky ? 'Stinky' : 'Mild' }
                                </small>
                            </div>
                            <div>
                                <small>
                                    { cheese.hasHoles ? 'Holey' : 'Solid' }
                                </small>
                            </div>
                            <div>
                                <small>
                                    { cheese.isSoft ? 'Soft' : 'Hard' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" variant="info"
                            onClick={() => setMoldModalShow(true)}
                        >
                            Give this {cheese.type} some mold!
                        </Button>
                        {
                            user && cheese.owner === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {cheese.type}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => eatCheese()}
                                >
                                    Eat {cheese.type}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={moldCardContainerLayout}>
                {moldCards}
            </Container>
            <EditCheeseModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateCheese={updateCheese}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                cheese={cheese}
            />
            <NewMoldModal 
                cheese={cheese}
                show={moldModalShow}
                handleClose={() => setMoldModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowCheese