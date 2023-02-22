import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MoldForm from '../shared/MoldForm'
import { createMold } from '../../api/molds'
import messages from '../shared/AutoDismissAlert/messages'

const NewMoldModal = (props) => {
    const { cheese, show, handleClose, msgAlert, triggerRefresh } = props

    const [mold, setMold] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setMold(prevMold => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
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
        createMold(cheese.id, mold)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createMoldSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createMoldFailure,
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
                    heading={`Give ${cheese.name} a mold!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewMoldModal