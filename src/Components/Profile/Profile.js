import React from "react"
import { Container, Row, Col, Image, ButtonToolbar, Button, ListGroup, Accordion, Card, Modal } from 'react-bootstrap'
import { Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { fetchPublications } from '../../Actions/publicationsActions'
import SimpleTabs from '../Tabs/Tabs'
import ShowModal from '../ShowModal/ShowModal'
import publicationParse from '../../decode'
import "./Profile.css"



class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                researchInterests: "",
                firstName: "",
                lastName: "",
                email: "",
                profilePicture: ""
            }
        }

        this.handleClick = this.handleClick.bind(this)
        this.redirect = this.redirect.bind(this)
        this.addDefaultSrc = this.addDefaultSrc.bind(this)
    }

    handleClick(event) {

        this.callApi()

    }

    addDefaultSrc(ev) {
        ev.target.src = '/bruin.png'
    }

    redirect(event) {
        this.setState({ redirect: true })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // //console.log(this.props)
        let userInfo = this.props.location.state;
        const userID = this.props.match.params.userID;
        //console.log(fetchPublications(userID))
        this.props.dispatch(fetchPublications(userID));
        // this.props.dispatch(clearUserUpdate())
        this.setState({ "userInfo": userInfo });
    }



    render() {

        // //console.log(this.state.userInfo)

        const fullName = this.state.userInfo.firstName + " " + this.state.userInfo.lastName;
        const interests = this.state.userInfo.researchInterests.split(",");
        const email = this.state.userInfo.email;
        const profilePicture = this.state.userInfo.profilePicture;
        const userID = this.props.match.params.userID; //userID of user of this page
        const loggedIn = this.props.loggedIn;
        const user = this.props.user;

        //console.log(loggedIn)
        //console.log(user)

        return (

            <div>
                <Container className="tabs">
                    <Row>
                        <SimpleTabs />
                    </Row>
                </Container>
                <Container id={"bg-1"} fluid="true">
                    <Row id="buttonBar">
                        <ButtonToolbar id="buttons" size="sm"> {ButtonBar(loggedIn, userID, user)} </ButtonToolbar>
                    </Row>
                    <Row>
                        <Col>
                            <Image onError={this.addDefaultSrc} src={profilePicture} id="imgContainer" thumbnail="true" />
                            <h1> {fullName} </h1>
                            <h5> {email} </h5>
                        </Col>
                        <Col>
                                <Container id="jumbo" fluid="true">
                                    <h1 style={{ textAlign: "center" }}>Research Interests</h1>
                                    <ul>
                                        {interests.map((item, i) => <li key={i}> {item} </li>)}
                                    </ul>
                                </Container>
                        </Col>
                    </Row>
                </Container>
                <Container id={"bg-2"} fluid="true">
                    <h1> Recent Publications </h1>
                    {Publications(this.props.publications)}
                </Container>
            </div>

        )
    }

}

const ButtonBar = (loggedIn, userID, user) => {
    //console.log(loggedIn)
    if (!loggedIn)
        return (
            <Button variant="primary" >
                Claim
            </Button>
        )

    //console.log(userID)
    //console.log(user.userID)
    if (userID == user.userID) //cmp userID of loggedin user with current profile
        return (
            <LinkContainer to='/create'>
                <Button variant="primary">
                    Edit
    			</Button>
            </LinkContainer>
        )

    return null;
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


const Publications = (publications) => {

    return (
        <Accordion>
            {publications.map((publication, i) => Publication(publication, i))}
        </Accordion>
    )
}


export default withRouter(Profile)
