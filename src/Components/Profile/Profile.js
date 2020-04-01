import React from "react"
import { Container, Row, Col, Image, ButtonToolbar, Button, ListGroup, Accordion, Card, Modal } from 'react-bootstrap'
import { Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { fetchPublications } from '../../Actions/publicationsActions'
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
        this.callApi = this.callApi.bind(this)
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

    callApi() {

        // 		var self = this;
        // 		var str = "" ;
        // 		// var str = 'https://ushare.idre.ucla.edu/ushare/api';
        // 		var opts = {
        // 			"userID": self.state.userInfo.userID,
        // 			"claimedBy": localStorage.getItem("SHIBEDUPERSONTARGETEDID")
        // 		}


        // 		fetch(str + '/users' , {
        // 			method: 'post',
        // 			headers: {
        // 				'Content-Type': 'application/json',
        // 				// 'Content-Type': 'application/x-www-form-urlencoded',
        // 			},
        // 			body: JSON.stringify(opts)
        // 		  }).then(function(response) {
        // 			return response.json();
        // 		  }).then(function(data) {
        // 			localStorage.setItem("ISCLAIMED", true)
        // 			self.setState({"claimed": true});
        // 			alert("Succesfully Claimed")
        // 		  });

    }


    componentDidMount() {
        window.scrollTo(0, 0);
        // //console.log(this.props)
        let userInfo = this.props.location.state;
        const userID = this.props.match.params.userID;
        //console.log(fetchPublications(userID))
        this.props.dispatch(fetchPublications(userID));
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

			<Container id={"bg-1"} fluid="true">
			<Row>
			<Col>
				<Image onError={this.addDefaultSrc} src={profilePicture} id="imgContainer" thumbnail="true"  />

					<h1> {fullName} </h1>
					<h5> {email} </h5>
			</Col>

			<Col>
				<div>


				<ButtonToolbar id="buttons"> { ButtonBar(loggedIn,userID,user) } </ButtonToolbar>

					</div>
				<div id="jumbo" fluid="true">


				  <Container>
				    <h1 style={{textAlign:"center"}}>Research Interests</h1>
				<ul>
					{interests.map((item,i) => <li key={i}> {item} </li>)}
				</ul>
				  </Container>
				</div>

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
            <Button variant="primary" size="lg">
				Claim
				</Button>
        )

    //console.log(userID)
    //console.log(user.userID)
    if (userID == user.userID) //cmp userID of loggedin user with current profile
        return (
            <LinkContainer to='/create'>
                <Button variant="primary" size="lg">
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
        <Card bg="white" text='black' border="dark">
                <Card.Header>
                  <Accordion.Toggle as={Card.Header} eventKey={i}>
                    {publication.paperDisplay}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i}>
                  <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>Authors: {pub.authors}</ListGroup.Item>
                        <ListGroup.Item>Fields: {pub.fields}</ListGroup.Item>
                        <ListGroup.Item> <ShowModal source={pub['source']}/> </ListGroup.Item>
                      </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
    )
}


const Publications = (publications) => {

    return (
        <Accordion>
            {publications.map((publication,i) => Publication(publication,i) )}
            </Accordion>
    )
}


export default withRouter(Profile)
