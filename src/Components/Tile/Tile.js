import React from "react"
import "./Tile.css"
import { Card } from 'react-bootstrap';
import { Route, Redirect } from 'react-router'
// import { conditionalExpression } from "babel-types";

class Tile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		}
	}


	makeUpperCaseAfterCommas(str) {
		return str.replace(new RegExp("(?:\\b|_)([a-z])", "g"), function($1) {
			return $1.toUpperCase();
		});

	}

	componentDidMount() {
		// console.log(this.props.contact)
	}

	render() {

		const fullName = this.props.contact.firstName + " " + this.props.contact.lastName;

		if (this.state.clicked) {
			// console.log(this.props.contact)
			return (
				<Redirect to={{
            pathname: '/users/' + this.props.contact.userID,
            state: this.props.contact
        }}/>
			)
		}
		else
			return (

				<Card onClick={()=> this.setState({ clicked: true })}>
	  <Card.Body>
	    <Card.Title>{fullName}</Card.Title>
	    <Card.Text>
	      {(this.makeUpperCaseAfterCommas(this.props.contact.researchInterests))}
	    </Card.Text>
	  </Card.Body>
	</Card>
			)
	}
}

export default Tile;
