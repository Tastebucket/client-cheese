// this form will take several props and be used both to create and update cheeses
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const CheeseForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself(cheese), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { cheese, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your cheese's name?"
                        name="name"
                        id="name"
                        value={ cheese.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control 
                        placeholder="What type of cheese is this?"
                        name="type"
                        id="type"
                        value={ cheese.type }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Age:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How old is your cheese?"
                        name="age"
                        id="age"
                        value={ cheese.age }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this cheese adoptable?"
                        name="adoptable"
                        defaultChecked={ cheese.adoptable }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CheeseForm