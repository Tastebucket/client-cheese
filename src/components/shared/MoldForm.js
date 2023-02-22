import { Form, Button, Container } from 'react-bootstrap'

const MoldForm = (props) => {
    const { mold, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the mold's name?"
                        name="name"
                        id="name"
                        value={ mold.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of mold is this?"
                        name="description"
                        id="description"
                        value={ mold.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this mold squeaky?"
                        name="isSqueaky"
                        defaultChecked={ mold.isSqueaky }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="mold condition"
                        name="condition"
                        defaultValue={mold.condition}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="new">new</option>
                        <option value="used">used</option>
                        <option value="disgusting">disgusting</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MoldForm