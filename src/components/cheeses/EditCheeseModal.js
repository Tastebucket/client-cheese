// this modal is rendered by ShowCheese
// The state that controls whether this is open or not live in ShowCheese
// the state and the updaterfunction associated with that state is passed here as a prop.
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CheeseForm from '../shared/CheeseForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditCheeseModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateCheese, msgAlert, triggerRefresh } = props

    const [cheese, setCheese] = useState(props.cheese)

    const onChange = (e) => {
        e.persist()
        
        setCheese(prevCheese => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedCheese = {
                [updatedName] : updatedValue
            }
            
            console.log('the cheese', updatedCheese)

            return {
                ...prevCheese, ...updatedCheese
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateCheese(user, cheese)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateCheeseSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowCheese component that does this for us, and we'll import that here as a prop
            // this triggers a refresh of the parent(ShowCheese) by changing the value of the updated piece of state which lives in useEffect's dependency array.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateCheeseFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CheeseForm 
                    cheese={cheese} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Cheese"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCheeseModal