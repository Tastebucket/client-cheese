import { Form, Button, Container } from 'react-bootstrap'

const MoldForm = (props) => {
    const { mold, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Color:</Form.Label>
                    <Form.Control 
                        placeholder="What color is the mold?"
                        name="color"
                        id="color"
                        value={ mold.color }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Diameter (cm):</Form.Label>
                    <Form.Control 
                        placeholder="How big is the mold spot?"
                        name="diameter"
                        id="diameter"
                        value={ mold.diameter }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this mold fuzzy?"
                        name="isFuzzy"
                        defaultChecked={ mold.isFuzzy }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MoldForm