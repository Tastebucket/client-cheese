import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteMold } from '../../api/molds'
import GrowMoldModal from './GrowMoldModal'

const ShowMold = (props) => {
    const { mold, user, cheese, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)
    const formatColor = mold.color.toLowerCase()
    // delete, similar to delete for cheeses, all we have to do is ensure that the user is the cheese's owner, and make the api call passing in the right args.
    const destroyMold = () => {
        // this is the api call file function
        // it requires three args, user, cheeseId, & moldId
        deleteMold(user, cheese._id, mold._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Mold Deleted',
                    message: 'Bye Bye mold!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" >
                <Card.Header style={{backgroundColor:`${formatColor}`}}></Card.Header>
                <Card.Body>
                    <small>{mold.color} mold</small><br/>
                    <small>{mold.diameter} cm spot</small><br/>
                </Card.Body>
                <Card.Footer>
                    {
                        user && user._id === cheese.owner
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Grow Mold
                            </Button>
                            <Button 
                                onClick={() => destroyMold()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Mold
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <GrowMoldModal
                user={user}
                cheese={cheese}
                mold={mold}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowMold