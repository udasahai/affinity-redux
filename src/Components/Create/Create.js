import React from "react"
import "./Create.css"
import { Form, Button, Badge } from 'react-bootstrap';
import { Route, Redirect } from 'react-router'
import ImageUploader from 'react-images-upload';
import { updateUser, clearUserUpdate } from '../../Actions/userActions'


class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contact: {
                researchInterests: "",
                firstName: "",
                lastName: "",
                email: "",
                profilePicture: ""
            },
            submitted : false, 
            interests: [],
            interestValue: "",
            pictures: [],
            hasPicture: false,
            loggedIn: false
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleInterestChange = this.handleInterestChange.bind(this);
        this.removePill = this.removePill.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    removePill(event) {
        var pills = this.state.interests
        var index = pills.indexOf(event.currentTarget.value)

        if (index > -1) {
            pills.splice(index, 1)
        }

        this.setState({ interests: pills })
    }

    onDrop(picture) {

        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    researchPills() {
        var pills = this.state.interests
        return pills.map((pill, i) =>
            (<button type="button" key={i} value={pill} onClick={this.removePill}>
            <Badge variant="info">{pill}</Badge>
            </button>)
        )
    }


    handleChange(event){
        const {id} = event.target;
        this.setState({
            contact: {
                ...this.state.contact,
                [id] : event.target.value
            }
        })

    }

    handleInterestChange(event) {
        this.setState({ interestValue: event.target.value })
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            var joined = this.state.interests.concat(this.state.interestValue)
            this.setState({ interestValue: "" })
            this.setState({
                interests: joined
            })

        }
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateForm(){
        return (this.state.contact.firstName.length > 0 &&
            this.state.contact.lastName.length > 0 && 
            this.validateEmail(this.state.contact.email))
    }


    onSubmit(){
        this.setState({
            submitted : true
        })
        if(this.validateForm()){
            console.log("Pressed Submit")
            console.log(this.state)
        } else {
            console.log("Invalid Form")
        }
    }


    // handleSubmit(event) {
    //     this.props.dispatch(updateUser({
    //         firstName:
    //     }))
    // }


    componentDidMount() {
        this.setState({
            contact: this.props.contact,
            loggedIn: false,
            interests : this.props.contact.researchInterests.split(',').filter(x => x)
        }, () => console.log(this.state));



    }

    render() {


        const firstName = this.state.contact.firstName;
        const lastName = this.state.contact.lastName;
        const email = this.state.contact.email;
        const interestValue = this.state.interestValue


        return (
            <div id="box">
                <Form>

                <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />


                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="firstname" autoComplete="off" value={firstName} required
                                    onChange={this.handleChange} placeholder="Enter First name" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        *First name is required.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="lastname" autoComplete="off" value={lastName} onChange={this.handleChange} placeholder="Enter Last name" />
                    <Form.Text className="text-muted">
                        *Last name is required.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" autoComplete="off" value={email} onChange={this.handleChange} placeholder="Enter email address" />
                    <Form.Text className="text-muted">
                        *Email is required.
                    </Form.Text>
                </Form.Group>

                <div>
               {this.researchPills()}
                </div>

                <Form.Group controlId="researchInterests">
                    <Form.Label>Research Interests</Form.Label>
                    <Form.Control type="interests" autoComplete="off" value={interestValue} onKeyPress={this.handleKeyPress}  onChange={this.handleInterestChange} placeholder="Enter research interests" />
                    <Form.Text className="text-muted">
                    Press Enter after each interest. Click on an interest to erase it.
                    </Form.Text>
                </Form.Group>

                {!this.validateForm() && this.state.submitted ? <p className="error">Please fill out name and email before submitting</p> : null} 

                <Button variant="primary" type="button" onClick={this.onSubmit}>
                    Submit
                </Button>
                </Form>
            </div>
        )
    }

}
export default Create;
