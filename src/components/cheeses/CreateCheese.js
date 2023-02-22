// CreateCheese needs to render a form
// that form should build a cheese object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new cheese show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import { createCheese } from '../../api/cheeses'
import { createCheeseSuccess, createCheeseFailure } from '../shared/AutoDismissAlert/messages'
import CheeseForm from '../shared/CheeseForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateCheese = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [cheese, setCheese] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        e.persist()
        
        setCheese(prevCheese => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
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

        createCheese(user, cheese)
            // first we'll nav to the show page
            .then(res => { navigate(`/cheeses/${res.data.cheese.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createCheeseSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createCheeseFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <CheeseForm 
            cheese={cheese}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new cheese!"
        />
    )
}

export default CreateCheese