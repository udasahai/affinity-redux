import React from "react"
import { Container, ListGroup, Accordion, Card } from 'react-bootstrap'
import ShowModal from '../ShowModal/ShowModal'
import publicationParse from '../../decode'
import "./Publications.css"



 function MyPublications(props){
    const publications = props.publications; 

    return (
        <Container id={"bg-2"} fluid="true">
        <h1> Recent Publications </h1>
        <Accordion>
            {publications.map((publication, i) => Publication(publication, i))}
        </Accordion>
        </Container>
    )
}

const Publication = (publication, i) => {
    const pub = publicationParse(publication);
    // console.log(pub)

    return (
        <Card key={i} bg="white" text='black' border="dark">
            <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey={i}>

                    <b> {publication.paperDisplay} <span id='arrow'>▼</span> </b>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i}>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='capitalize'><b> Authors: </b> {pub.authors}</ListGroup.Item>
                        <ListGroup.Item className='capitalize'><b> Fields: </b> {pub.fields}</ListGroup.Item>
                        <ListGroup.Item className='capitalize'> <ShowModal source={pub['source']} /> </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default MyPublications;
