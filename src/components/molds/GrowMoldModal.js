// this mold modal shows up on a ShowMold component
// has the ability to edit individual molds, one at a time
// will need to call the api,
// send a message,
// refresh the parent.
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MoldForm from '../shared/MoldForm'
import { updateMold } from '../../api/molds'
// import messages from '../shared/AutoDismissAlert/messages'

const GrowMoldModal = (props) => {
    const { user, cheese, show, handleClose, msgAlert, triggerRefresh } = props

    const [mold, setMold] = useState(props.mold)

    const onChange = (e) => {
        e.persist()
        
        setMold(prevMold => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'isFuzzy' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isFuzzy' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedMold = {
                [updatedName] : updatedValue
            }
            
            console.log('the mold', updatedMold)
            console.log('the mold (state)', mold)

            return {
                ...prevMold, ...updatedMold
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateMold(user, cheese._id, mold)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'This mold is thriving',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MoldForm 
                    mold={mold}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update The Mold"
                />
            </Modal.Body>
        </Modal>
    )
}

export default GrowMoldModal