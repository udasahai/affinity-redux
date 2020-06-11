import React from "react"
import { Container, Row, Col, Image, ButtonToolbar, Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { fetchPublications } from '../../Actions/publicationsActions'
import MyPublications from '../Publications/Publications';
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
                profilePicture: "",
                claimed: true
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
        console.log(userInfo)
    }



    render() {

        const userProps = {
             fullName : this.state.userInfo.firstName + " " + this.state.userInfo.lastName,
             interests : this.state.userInfo.researchInterests.split(","),
             email : this.state.userInfo.email,
             claimed : this.state.userInfo.claimed,
             profilePicture : this.state.userInfo.profilePicture,
             userID : this.props.match.params.userID, //userID of user of this page
             loggedIn : this.props.loggedIn,
             loggedInUser : this.props.loggedInUser,
             addDefaultSrc : this.addDefaultSrc
        }

        //console.log(loggedIn)

        return (

            <div>
                <MyProfile userProps={userProps}/>
                <MyPublications publications={this.props.publications}/>
            </div>

        )
    }

}

function MyProfile(props){
        const fullName = props.userProps.fullName;
        const interests = props.userProps.interests;
        const email = props.userProps.email;
        const profilePicture = props.userProps.profilePicture;
        const claimed = props.userProps.claimed;
        const userID = props.userProps.userID; //userID of user of this page
        const loggedIn = props.userProps.loggedIn;
        const loggedInUser = props.userProps.loggedInUser;
        const addDefaultSrc = props.userProps.addDefaultSrc;


    return (
    <Container id={"bg-1"} fluid="true">
        <Row id="buttonBar">
            <ButtonToolbar id="buttons" size="sm"> {ButtonBar(loggedIn, userID, loggedInUser, claimed)} </ButtonToolbar>
        </Row>
        <Row>
            <Col>
                <Image onError={addDefaultSrc} src={profilePicture} id="imgContainer" thumbnail="true" />
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
    </Container>);
}

const ButtonBar = (loggedIn, userID, loggedInUser, claimed) => {
    //console.log(loggedIn)
    console.log(claimed);

    if (!loggedIn)
        return (
            <Button disabled={claimed} variant="primary" >
                Claim
            </Button>
        )


    if (parseInt(userID) === parseInt(loggedInUser.userID)) //cmp userID of loggedin user with current profile
        return (
            <LinkContainer to='/create'>
                <Button variant="primary">
                    Edit
    			</Button>
            </LinkContainer>
        )

    return null;
}




export default withRouter(Profile)
